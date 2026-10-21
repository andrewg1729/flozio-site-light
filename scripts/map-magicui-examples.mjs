import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import ts from "typescript";

const catalog = JSON.parse(fs.readFileSync("public/magicui-catalog.json", "utf8"));
const docsRoot = ".magicui-source/apps/www/content/docs/components";
const components = new Map(catalog.components.map((component) => [component.name, component]));
const examplesByRoute = new Map();
const errors = [];

for (const example of catalog.examples) {
  const component = components.get(example.component);
  const route = component?.docsUrl ? new URL(component.docsUrl).pathname : null;
  const sourceId = path.basename(new URL(example.rawUrl).pathname, ".tsx");
  const docsSlug = route?.split("/").at(-1);
  const docsPath = docsSlug ? path.join(docsRoot, `${docsSlug}.mdx`) : null;
  let docs = docsPath && fs.existsSync(docsPath) ? fs.readFileSync(docsPath, "utf8") : "";
  const aliases = [sourceId, sourceId.replace(/demo(\d+)$/, "demo-$1")];
  let previewIds = [...docs.matchAll(/<ComponentPreview\s+name=["']([^"']+)["']/g)].map((match) => match[1]);
  let previewId = aliases.find((id) => previewIds.includes(id)) || null;
  if (!previewId && docsPath && source && docs.includes("## Examples")) {
    const usageOffset = docs.indexOf("\n## Usage", docs.indexOf("## Examples"));
    if (usageOffset >= 0) {
      const inserted = `\n\n### ${example.name}\n\n<ComponentPreview name="${sourceId}" />\n`;
      docs = `${docs.slice(0, usageOffset)}${inserted}${docs.slice(usageOffset)}`;
      fs.writeFileSync(docsPath, docs);
      previewIds = [...docs.matchAll(/<ComponentPreview\s+name=["']([^"']+)["']/g)].map((match) => match[1]);
      previewId = aliases.find((id) => previewIds.includes(id)) || sourceId;
    }
  }
  const occurrence = previewId ? previewIds.indexOf(previewId) : -1;
  const examplePath = path.join(".magicui-source/apps/www/registry/example", `${sourceId}.tsx`);
  const source = fs.existsSync(examplePath) ? fs.readFileSync(examplePath, "utf8") : "";
  const previewOffset = previewId ? docs.indexOf(`<ComponentPreview name="${previewId}"`) : -1;
  const priorHeadings = previewOffset >= 0 ? [...docs.slice(0, previewOffset).matchAll(/^#{1,6}\s+(.+)$/gm)] : [];
  const sectionHeading = priorHeadings.at(-1)?.[1]?.trim() || null;
  const anchor = sectionHeading?.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/[\s-]+/g, "-") || null;
  const imports = [...source.matchAll(/^import\s+(?:type\s+)?(?:\{([^}]+)\}|([\w$]+))\s+from\s+["']([^"']+)["']/gm)]
    .map((match) => ({ imported: (match[1] || match[2] || "").split(",").map((part) => part.trim()).filter(Boolean), from: match[3] }));
  const sourceFile = ts.createSourceFile(examplePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const importedComponents = new Set();
  const primaryImports = imports.filter(({ from }) => /(?:registry\/magicui|components\/magicui)\//.test(from));
  for (const declaration of sourceFile.statements) {
    if (!ts.isImportDeclaration(declaration) || !ts.isStringLiteral(declaration.moduleSpecifier)) continue;
    if (!/(?:registry\/magicui|components\/magicui)\//.test(declaration.moduleSpecifier.text)) continue;
    const bindings = declaration.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) importedComponents.add(element.name.text);
  }
  const componentUsage = [];
  const visit = (node) => {
    if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && ts.isIdentifier(node.tagName) && importedComponents.has(node.tagName.text)) {
      componentUsage.push({
        component: node.tagName.text,
        props: node.attributes.properties.filter(ts.isJsxAttribute).map((attribute) => ({
          name: attribute.name.text,
          value: attribute.initializer?.getText(sourceFile) ?? "true",
        })),
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  const jsxTags = [...new Set([...source.matchAll(/<([A-Z][A-Za-z0-9_.]*)\b/g)].map((match) => match[1]))];
  const interactions = [
    ...( /onClick\s*=|onDoubleClick\s*=/.test(source) ? ["click"] : []),
    ...( /onPointer(?:Down|Move|Up)|onMouse(?:Down|Move|Up|Enter|Leave)|onTouch(?:Start|Move|End)/.test(source) ? ["pointer / mouse / touch"] : []),
    ...( /onKey(?:Down|Up|Press)/.test(source) ? ["keyboard"] : []),
    ...( /useScroll|whileInView|useInView/.test(source) ? ["scroll / viewport"] : []),
    ...( /setInterval|requestAnimationFrame|animate\(|useAnimation|useAnimate|transition\s*=/.test(source) ? ["time / animation"] : []),
  ];
  if (!route || occurrence < 0 || !source) errors.push({ name: example.name, sourceId, route, docsPath, previewIds, sourceFound: Boolean(source) });
  const entry = {
    ...example,
    sourceId,
    previewId,
    sectionHeading,
    anchor,
    route,
    docsPath,
    previewIndex: occurrence,
    sourceAudit: {
      status: source ? "static-source-extracted" : "source-missing",
      file: examplePath.replaceAll("\\", "/"),
      bytes: Buffer.byteLength(source),
      sha256: source ? crypto.createHash("sha256").update(source).digest("hex") : null,
      imports,
      jsxTags,
      primaryImports,
      componentUsage,
      detectableInteractions: interactions,
    },
  };
  const routeExamples = examplesByRoute.get(route) || [];
  routeExamples.push(entry);
  examplesByRoute.set(route, routeExamples);
}

const records = [...examplesByRoute].map(([route, examples]) => ({
  route,
  docsPath: examples[0]?.docsPath,
  examples: examples.map(({ name, sourceId, previewId, sectionHeading, anchor, route, previewIndex, sourceAudit }) => ({ name, sourceId, previewId, sectionHeading, anchor, route, previewIndex, sourceAudit })),
}));
const report = { catalogExamples: catalog.examples.length, routes: records.length, errors: errors.length, errorDetails: errors, records };
fs.writeFileSync(".magicui-source/example-map-audit.json", `${JSON.stringify(report, null, 2)}\n`);
catalog.examples = catalog.examples.map((example) => {
  const sourceId = path.basename(new URL(example.rawUrl).pathname, ".tsx");
  const record = records.flatMap((routeRecord) => routeRecord.examples).find((candidate) => candidate.sourceId === sourceId);
  const component = components.get(example.component);
  return record ? {
    ...example,
    url: example.url.replace("/blob/main/", `/blob/${catalog.source.sourceRepositoryCommit}/`),
    rawUrl: example.rawUrl.replace("/main/", `/${catalog.source.sourceRepositoryCommit}/`),
    ...record,
    componentTitle: component?.title || null,
    reviewDescription: component?.reviewDescription || null,
    interaction: component?.interaction || null,
    motionProfile: component?.motionProfile || null,
    behaviorTags: component?.behaviorTags || [],
    fitTags: component?.fitTags || [],
  } : example;
});
catalog.source.exampleSourceInventoryCount = catalog.examples.filter((example) => example.sourceAudit?.status === "static-source-extracted").length;
catalog.source.exampleSourceFilesMissingCount = catalog.examples.length - catalog.source.exampleSourceInventoryCount;
delete catalog.source.exampleRuntimeReviewedCount;
catalog.source.exampleDocPreviewMappedCount = catalog.examples.filter((example) => example.previewId).length;
catalog.source.exampleMappingAuditTimestamp = new Date().toISOString();
fs.writeFileSync("public/magicui-catalog.json", `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Mapped ${catalog.examples.length - errors.length}/${catalog.examples.length} examples to ${records.length} docs routes; ${errors.length} need investigation.`);
