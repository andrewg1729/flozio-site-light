(() => {
  const replaceBrand = (value) => value.replace(/ClickUp/g, "Flozio").replace(/\u2122/g, "");
  const logoLinkSelector = 'a[class*="logoButton_"], a[class*="LogoButton_"], a[data-flozio-brandmark="true"], a[aria-label="ClickUp Home"]';

  const setAttribute = (element, name, value) => {
    if (element.getAttribute(name) !== value) element.setAttribute(name, value);
  };

  const muteClickUpTelemetry = () => {
    const hosts = new Set(["data.web.clickup.com", "io.web.clickup.com"]);
    window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    if (!window.dataLayer.some((entry) => entry?.event === "gtagGet")) {
      window.dataLayer.push({ event: "gtagGet", gtagResult: {} });
    }

    const nativeFetch = window.fetch.bind(window);
    window.fetch = (input, init) => {
      const value = typeof input === "string" || input instanceof URL ? input : input.url;
      try {
        const url = new URL(value, window.location.href);
        if (hosts.has(url.hostname) || url.hostname.endsWith(".amplitude.com")) {
          const payload = url.pathname.endsWith("/settings")
            ? { integrations: {}, remotePlugins: [] }
            : url.hostname.endsWith(".amplitude.com")
              ? { config: {}, success: true }
              : { success: true };
          return Promise.resolve(new Response(JSON.stringify(payload), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }));
        }
      } catch {
        // Keep browser handling unchanged for inputs that are not URLs.
      }
      return nativeFetch(input, init);
    };
  };

  const skipMissingRoutePrefetches = () => {
    const missingChunks = new Set([
      "/_next/static/chunks/7075-92bc532091f5a36f.js",
      "/_next/static/chunks/6597-bcd2cb7f55d14372.js",
      "/_next/static/chunks/pages/v4-efd057466295528e.js",
      "/_next/static/chunks/pages/brain/agents-45c5e4e5979b1562.js",
    ]);
    const missingData = /\/_next\/data\/[^/]+\/features\/(tasks|project-time-tracking|calendar|whiteboards)\.json$/;

    const shouldSkipLink = (node) => {
      if (!(node instanceof HTMLLinkElement)) return false;
      try {
        const url = new URL(node.href, window.location.href);
        if (url.hostname === "pages.clickup.com" && url.pathname === "/js/forms2/js/forms2.min.js") return true;
        return node.relList.contains("prefetch") && missingChunks.has(url.pathname);
      } catch {
        return false;
      }
    };

    for (const method of ["appendChild", "insertBefore"]) {
      const original = Node.prototype[method];
      Node.prototype[method] = function (node, reference) {
        if (shouldSkipLink(node)) return node;
        return method === "appendChild"
          ? original.call(this, node)
          : original.call(this, node, reference);
      };
    }

    const nativeAppend = Element.prototype.append;
    Element.prototype.append = function (...nodes) {
      return nativeAppend.apply(this, nodes.filter((node) => !shouldSkipLink(node)));
    };

    const nativePrepend = Element.prototype.prepend;
    Element.prototype.prepend = function (...nodes) {
      return nativePrepend.apply(this, nodes.filter((node) => !shouldSkipLink(node)));
    };

    const nativeFetch = window.fetch.bind(window);
    window.fetch = (input, init) => {
      const value = typeof input === "string" || input instanceof URL ? input : input.url;
      try {
        const url = new URL(value, window.location.href);
        if (url.origin === window.location.origin && missingData.test(url.pathname)) {
          return Promise.resolve(new Response('{"pageProps":{}}', {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }));
        }
      } catch {
        // Let the browser handle unusual fetch inputs unchanged.
      }
      return nativeFetch(input, init);
    };
  };

  const updateBrandLink = (link) => {
    setAttribute(link, "data-flozio-brandmark", "true");
    setAttribute(link, "aria-label", "Flozio Home");

    link.querySelectorAll("img").forEach((image) => {
      setAttribute(image, "src", "/Flozio_Logo_32x32.png");
      setAttribute(image, "alt", "Flozio");
      setAttribute(image, "aria-label", "Flozio");
      setAttribute(image, "width", "32");
      setAttribute(image, "height", "32");
      setAttribute(image, "data-flozio-logo", "true");
    });

    link.querySelectorAll("svg[aria-label]").forEach((svg) => {
      setAttribute(svg, "aria-label", "Flozio");
    });

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

    if (element instanceof HTMLAnchorElement) {
      const isLogo = element.dataset.flozioBrandmark === "true" ||
        String(element.className).toLowerCase().includes("logobutton_") ||
        element.getAttribute("aria-label") === "ClickUp Home" ||
        element.querySelector('img[src*="clickup-logo.svg"], svg[aria-label*="ClickUp"]');
      if (isLogo) updateBrandLink(element);
    }

    element.querySelectorAll?.(logoLinkSelector).forEach(updateBrandLink);
  };

  const applyToDocument = () => {
    document.querySelectorAll("title, meta, link").forEach(updateMetadata);
    document.querySelectorAll(logoLinkSelector).forEach(updateBrandLink);
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
        display: none !important;
      }
      a[data-flozio-brandmark="true"] > svg {
        display: none !important;
      }
      a[data-flozio-brandmark="true"]::before {
        content: "";
        display: block;
        flex: 0 0 30px;
        inline-size: 30px;
        block-size: 30px;
        background: url("/Flozio_Logo_32x32.png") center / contain no-repeat;
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
    skipMissingRoutePrefetches();
    muteClickUpTelemetry();
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

  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
