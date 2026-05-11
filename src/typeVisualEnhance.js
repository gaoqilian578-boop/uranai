function enhanceTypeCards() {
  document.querySelectorAll(".type-visual").forEach((card) => {
    const number = card.querySelector(".type-number")?.textContent?.trim();
    const typeId = Number.parseInt(number ?? "", 10);
    if (!typeId || card.classList.contains(`type-visual-${typeId}`)) return;

    card.classList.add(`type-visual-${typeId}`);

    if (!card.querySelector(".motif")) {
      const motif = document.createElement("div");
      motif.className = "motif";
      motif.setAttribute("aria-hidden", "true");
      motif.append(document.createElement("span"), document.createElement("span"), document.createElement("span"));
      const frame = card.querySelector(".tarot-frame");
      card.insertBefore(motif, frame);
    }
  });
}

const observer = new MutationObserver(enhanceTypeCards);

queueMicrotask(() => {
  enhanceTypeCards();
  const root = document.getElementById("root");
  if (root) observer.observe(root, { childList: true, subtree: true });
});
