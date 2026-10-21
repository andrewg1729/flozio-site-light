(() => {
  const filterRoot = document.getElementById('lab-filters');
  const listRoot = document.getElementById('lab-list');
  const countRoot = document.getElementById('lab-counts');
  const search = document.getElementById('lab-search');
  const activeSource = document.getElementById('lab-source');
  const title = document.getElementById('lab-title');
  const note = document.getElementById('lab-note');
  const details = document.getElementById('lab-details');
  const frame = document.getElementById('lab-frame');
  const openDocs = document.getElementById('lab-open-docs');
  const openSource = document.getElementById('lab-open-source');
  const filters = ['All', 'Components', 'Examples'];
  const localDocsOrigin = 'http://localhost:38472';
  let components = [];
  let examples = [];
  let items = [];
  let kind = 'All';
  let query = '';
  let active = 0;

  const localDocsUrl = (url) => {
    try {
      return `${localDocsOrigin}${new URL(url).pathname}#examples`;
    } catch {
      return `${localDocsOrigin}/docs/components`;
    }
  };

  const appendRow = (parent, label, value) => {
    if (!value || (Array.isArray(value) && !value.length)) return;
    const row = document.createElement('div');
    row.className = 'lab-detail-row';
    const key = document.createElement('span');
    key.className = 'lab-detail-label';
    key.textContent = label;
    const content = document.createElement('div');
    content.className = 'lab-detail-value';
    if (Array.isArray(value)) {
      value.forEach((part) => {
        const tag = document.createElement('code');
        tag.textContent = part;
        content.append(tag);
      });
    } else {
      const code = document.createElement('code');
      code.textContent = value;
      content.append(code);
    }
    row.append(key, content);
    parent.append(row);
  };

  const renderDetails = (item) => {
    details.replaceChildren();
    details.hidden = false;
    if (item.kind === 'example') {
      const description = document.createElement('p');
      description.textContent = item.component
        ? `Official example variant for ${item.componentTitle}. The live frame shows its component documentation; use the source link to inspect the exact demo implementation.`
        : 'Official example source. Its component association is not explicit in Magic UI’s index; open the source to inspect its implementation.';
      details.append(description);
      if (item.rawUrl) appendRow(details, 'Demo source', item.rawUrl);
      return;
    }
    if (item.kind === 'stale') {
      const status = document.createElement('p');
      status.textContent = item.legacyDocsUrl
        ? 'This is a legacy catalog entry. Current source is unavailable; its motion notes come from the linked official v3 documentation.'
        : 'No current official source or component-specific docs could be recovered for this historical entry; its motion remains unverified.';
      details.append(status);
      appendRow(details, 'What it appears to do', item.reviewDescription);
      appendRow(details, 'Try / motion', item.interaction);
      appendRow(details, 'Motion mechanism', item.motionProfile?.mechanism);
      appendRow(details, 'Trigger', item.motionProfile?.trigger);
      appendRow(details, 'Lifecycle', item.motionProfile?.lifecycle);
      appendRow(details, 'Evidence basis', item.motionProfile?.evidence);
      appendRow(details, 'Search / fit tags', item.fitTags);
      appendRow(details, 'Review status', item.reviewStatus);
      appendRow(details, 'Live preview audit', item.runtimeMotionAudit?.status || 'No component-specific preview route available');
      return;
    }
    appendRow(details, 'Install', item.installCommand);
    appendRow(details, 'Import', item.importPath);
    appendRow(details, 'Dependencies', item.dependencies);
    appendRow(details, 'Try / motion', item.interaction);
    appendRow(details, 'Motion mechanism', item.motionProfile?.mechanism);
    appendRow(details, 'Trigger', item.motionProfile?.trigger);
    appendRow(details, 'Lifecycle', item.motionProfile?.lifecycle);
    appendRow(details, 'Evidence basis', item.motionProfile?.evidence);
    appendRow(details, 'Search / fit tags', item.fitTags);
    appendRow(details, 'Review status', item.reviewStatus);
    if (item.runtimeMotionAudit) {
      const audit = item.runtimeMotionAudit;
      appendRow(details, 'Live preview audit', audit.status);
      appendRow(details, 'Browser evidence', [
        `Active preview nodes: ${audit.previewCount}`,
        `Web Animations detected: ${audit.activeAnimationDetected ? 'yes' : 'no'}`,
        `Frame changed between samples: ${audit.frameChangedBetweenSamples ? 'yes' : 'no'}`,
        `Input sampled: ${audit.inputMode || 'none'}`,
      ]);
    } else {
      appendRow(details, 'Live preview audit', 'Not runtime-audited');
    }
    if (item.props?.length) {
      const row = document.createElement('div');
      row.className = 'lab-detail-row lab-props-row';
      const label = document.createElement('span');
      label.className = 'lab-detail-label';
      label.textContent = 'Props';
      const list = document.createElement('div');
      list.className = 'lab-props-list';
      item.props.forEach((prop) => {
        const code = document.createElement('code');
        code.textContent = `${prop.name}${prop.optional ? '?' : ''}: ${prop.type}`;
        list.append(code);
      });
      row.append(label, list);
      details.append(row);
    } else {
      const status = document.createElement('p');
      status.textContent = item.sourceStatus === 'docs-only'
        ? 'This entry appears in the official docs catalog but not as an installable item in the current public registry.'
        : 'The current public registry does not expose a component source file for automated prop extraction. Open the official docs and registry details for this entry.';
      details.append(status);
    }
    if (item.sourceUrl) appendRow(details, 'Component source', item.sourceUrl);
  };

  const selectPreview = (index) => {
    active = index;
    const item = items[index];
    if (!item) return;
    activeSource.textContent = item.kind === 'example' ? 'Magic UI · Official example' : `Magic UI · ${item.kind === 'registry' ? 'Registry component' : 'Docs component'}`;
    title.textContent = item.title;
    note.textContent = item.reviewDescription || item.description || 'Official Magic UI catalog entry.';
    frame.title = `${item.title} live preview from Magic UI`;
    const docsHref = item.legacyDocsUrl || localDocsUrl(item.docsUrl);
    frame.src = docsHref;
    openDocs.href = docsHref;
    openDocs.textContent = item.legacyDocsUrl ? 'Open official v3 docs ↗' : 'Open local docs ↗';
    openSource.href = item.sourceUrl || item.exampleUrl || item.legacyDocsUrl || item.docsUrl || 'https://magicui.design/docs/components';
    openSource.textContent = item.sourceUrl || item.exampleUrl ? 'Open source ↗' : item.legacyDocsUrl ? 'Open docs & code ↗' : 'Open registry ↗';
    renderDetails(item);
    renderList();
  };

  const renderFilters = () => {
    filterRoot.replaceChildren();
    filters.forEach((name) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = name === kind ? 'lab-filter-active' : 'lab-filter';
      button.textContent = name === 'Components' ? `Components (${components.length})` : name === 'Examples' ? `Examples (${examples.length})` : name;
      button.addEventListener('click', () => {
        kind = name;
        active = Math.max(0, filteredItems()[0]?.index ?? 0);
        renderFilters();
        selectPreview(active);
        renderList();
      });
      filterRoot.append(button);
    });
  };

  const filteredItems = () => items.map((item, index) => ({ item, index })).filter(({ item }) => {
    const kindMatch = kind === 'All' || (kind === 'Components' ? item.kind !== 'example' : item.kind === 'example');
    const text = [item.title, item.description, item.reviewDescription, item.interaction, item.componentTitle,
      item.motionProfile?.mechanism, item.motionProfile?.trigger, item.motionProfile?.lifecycle, item.motionProfile?.evidence,
      ...(item.behaviorTags || []), ...(item.fitTags || [])].join(' ').toLowerCase();
    return kindMatch && (!query || text.includes(query));
  });

  const renderList = () => {
    listRoot.replaceChildren();
    filteredItems().forEach(({ item, index }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = index === active ? 'lab-item-active' : 'lab-item';
      const itemTitle = document.createElement('span');
      itemTitle.className = 'lab-item-title';
      itemTitle.textContent = item.title;
      const itemSource = document.createElement('span');
      itemSource.className = 'lab-item-source';
      itemSource.textContent = item.kind === 'example' ? `Example · ${item.componentTitle || 'Magic UI'}` : item.kind === 'registry' ? 'Installable component' : item.kind === 'stale' ? (item.legacyDocsUrl ? 'Legacy docs entry' : 'Unverified historical entry') : 'Docs component';
      button.append(itemTitle, itemSource);
      button.addEventListener('click', () => selectPreview(index));
      listRoot.append(button);
    });
  };

  search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    const visible = filteredItems();
    if (!visible.some(({ index }) => index === active)) active = visible[0]?.index ?? 0;
    renderList();
    if (visible.length) selectPreview(active);
  });

  fetch('/magicui-catalog.json')
    .then((response) => {
      if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
      return response.json();
    })
    .then((catalog) => {
      components = catalog.components
        .map((item) => ({ ...item, kind: item.sourceStatus === 'docs-only' ? 'docs' : item.sourceStatus.startsWith('ok') ? 'registry' : 'stale', exampleUrl: null }))
        .sort((a, b) => a.title.localeCompare(b.title));
      const byName = new Map(components.map((component) => [component.name, component]));
      examples = catalog.examples.map((item, index) => {
        const component = byName.get(item.component);
        return {
          kind: 'example',
          name: `example-${index}`,
          title: item.name,
          description: component ? `Official ${component.title} example variant.` : 'Official Magic UI example variant.',
          docsUrl: component?.docsUrl || 'https://magicui.design/docs/components',
          exampleUrl: item.url,
          sourceUrl: item.url,
          rawUrl: item.rawUrl,
          component: item.component,
          componentTitle: component?.title,
        };
      });
      items = [...components, ...examples];
      countRoot.textContent = `${catalog.source.componentReviewCount} motion profiles · ${catalog.source.motionProfileSourceReviewedCount} checked against source · ${catalog.source.legacyDocsBehaviorCount} legacy docs-only · ${catalog.source.legacyUnverifiedCount} historical entries unverified · ${catalog.source.officialExampleCount} official example variants`;
      renderFilters();
      const firstInteractiveDemo = items.findIndex((item) => item.name === 'cool-mode');
      selectPreview(firstInteractiveDemo >= 0 ? firstInteractiveDemo : 0);
    })
    .catch((error) => {
      countRoot.textContent = 'Could not load the Magic UI catalog.';
      title.textContent = 'Catalog unavailable';
      note.textContent = error.message;
    });
})();
