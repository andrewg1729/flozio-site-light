(() => {
  const template = document.getElementById("flozio-learning-loop-template");
  if (!(template instanceof HTMLTemplateElement)) return;

  const mountBeforeAgents = () => {
    const agents = document.querySelector('[data-testid="lp4-agents-section"]');
    if (!agents) return;

    let section = document.querySelector(".FlozioLearningLoop");
    if (section?.parentElement === agents.parentElement && section.nextElementSibling === agents) return;
    section?.remove();

    const fragment = template.content.cloneNode(true);
    if (fragment.querySelector(".FlozioLearningLoop")) agents.before(fragment);
  };

  const root = document.getElementById("__next") || document.body;
  let canRepairAfterHydration = false;
  const observer = new MutationObserver(() => {
    if (canRepairAfterHydration) mountBeforeAgents();
  });
  observer.observe(root, { childList: true, subtree: true });

  const mountAfterRender = () => requestAnimationFrame(() => requestAnimationFrame(() => {
    canRepairAfterHydration = true;
    mountBeforeAgents();
  }));
  setTimeout(mountAfterRender, 1000);
  window.addEventListener("load", () => setTimeout(mountAfterRender, 150), { once: true });
})();
