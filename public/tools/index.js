const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const headerMenu = document.querySelector("[data-header-menu]");

function setMenuOpen(isOpen) {
  if (!siteHeader || !menuToggle || !headerMenu) return;
  siteHeader.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

document.addEventListener("click", (event) => {
  if (!siteHeader?.classList.contains("menu-open")) return;
  if (event.target.closest("[data-header-menu]")) return;
  if (event.target.closest("[data-menu-toggle]")) return;
  setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});
