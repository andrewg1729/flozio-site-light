(() => {
  const replaceBrand = (value) => value.replace(/ClickUp/g, "Flozio").replace(/\u2122/g, "");

  const setAttribute = (element, name, value) => {
    if (element.getAttribute(name) !== value) element.setAttribute(name, value);
  };

  const updateLogo = (image) => {
    const link = image.closest("a");
    if (!link) return;

    setAttribute(link, "data-flozio-brandmark", "true");
    setAttribute(link, "aria-label", "Flozio Home");
    setAttribute(image, "src", "/Flozio_Logo_32x32.png");
    setAttribute(image, "alt", "Flozio");
    setAttribute(image, "aria-label", "Flozio");
    setAttribute(image, "width", "32");
    setAttribute(image, "height", "32");
    setAttribute(image, "data-flozio-logo", "true");

    const tracking = link.getAttribute("data-segment-props");
    if (tracking?.includes("ClickUp")) {
      setAttribute(link, "data-segment-props", replaceBrand(tracking));
    }
  };

  const updateMetadata = (element) => {
    if (element instanceof HTMLTitleElement) {
      const nextTitle = replaceBrand(element.textContent || "");
      if (element.textContent !== nextTitle) element.textContent = nextTitle;
    }

    if (element instanceof HTMLMetaElement) {
      const property = element.getAttribute("property") || "";
      const name = element.getAttribute("name") || "";
      const itemprop = element.getAttribute("itemprop") || "";
      if (["og:image", "og:image:secure_url", "twitter:image"].includes(property) ||
          name === "twitter:image" || itemprop === "image") {
        setAttribute(element, "content", "/logo.png");
      } else {
        const content = element.getAttribute("content");
        if (content?.includes("ClickUp")) setAttribute(element, "content", replaceBrand(content));
      }
    }

    if (element instanceof HTMLLinkElement) {
      const rels = element.relList;
      if (rels.contains("apple-touch-icon")) {
        setAttribute(element, "href", "/apple-touch-icon.png");
      } else if (rels.contains("manifest")) {
        setAttribute(element, "href", "/site.webmanifest");
      } else if (rels.contains("icon") || rels.contains("shortcut")) {
        const size = element.getAttribute("sizes");
        setAttribute(element, "href", size === "32x32" ? "/Flozio_Logo_32x32.png" : "/favicon.ico");
      }
    }
  };

  const updateText = (root) => {
    if (root.nodeType === Node.TEXT_NODE) {
      const parent = root.parentElement;
      if (!parent || parent.closest("script, style, noscript, textarea")) return;
      const value = replaceBrand(root.nodeValue || "");
      if (root.nodeValue !== value) root.nodeValue = value;
      return;
    }

    if (!(root instanceof Element) || root.matches("script, style, noscript, textarea")) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest("script, style, noscript, textarea")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    });
    let node;
    while ((node = walker.nextNode())) {
      const value = replaceBrand(node.nodeValue || "");
      if (node.nodeValue !== value) node.nodeValue = value;
    }
  };

  const updateElement = (element) => {
    if (!(element instanceof Element)) return;
    updateMetadata(element);

    for (const name of ["alt", "aria-label", "title", "data-segment-props"]) {
      const value = element.getAttribute(name);
      if (value?.includes("ClickUp")) setAttribute(element, name, replaceBrand(value));
    }

    if (element instanceof HTMLImageElement &&
        (element.dataset.flozioLogo === "true" || element.src.includes("clickup-logo.svg"))) {
      updateLogo(element);
    }

    if (element instanceof HTMLAnchorElement) {
      const logo = element.querySelector('img[data-flozio-logo="true"], img[src*="clickup-logo.svg"]');
      if (logo) updateLogo(logo);
    }

    element.querySelectorAll?.('img[data-flozio-logo="true"], img[src*="clickup-logo.svg"]').forEach(updateLogo);
  };

  const applyToDocument = () => {
    document.querySelectorAll("title, meta, link").forEach(updateMetadata);
    document.querySelectorAll('img[src*="clickup-logo.svg"], img[data-flozio-logo="true"]').forEach(updateLogo);
    updateText(document.body);
  };

  const ensureStyles = () => {
    if (document.getElementById("flozio-brand-styles")) return;
    const style = document.createElement("style");
    style.id = "flozio-brand-styles";
    style.textContent = `
      a[data-flozio-brandmark="true"] {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 7px !important;
        inline-size: max-content !important;
        block-size: 32px !important;
      }
      a[data-flozio-brandmark="true"] img {
        display: block !important;
        inline-size: 30px !important;
        block-size: 30px !important;
        object-fit: contain !important;
      }
      a[data-flozio-brandmark="true"]::after {
        content: "Flozio";
        color: #202124;
        font: 700 20px/1 Inter, sans-serif;
        letter-spacing: -0.65px;
      }
    `;
    document.head.appendChild(style);
  };

  const start = () => {
    ensureStyles();
    applyToDocument();

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") {
          updateText(record.target);
          continue;
        }

        if (record.type === "attributes") {
          updateElement(record.target);
          continue;
        }

        record.addedNodes.forEach((node) => {
          updateText(node);
          updateElement(node);
        });
      }
    });

    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["src", "alt", "aria-label", "title", "content", "href", "data-segment-props", "data-flozio-brandmark"],
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
