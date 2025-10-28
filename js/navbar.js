export function setupNavbar() {
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById("navbar");
  let isHidden = false;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          if (!isHidden) {
            navbar.classList.add("hidden");
            isHidden = true;
          }
        } else if (currentScrollY < lastScrollY - 10) {
          if (isHidden) {
            navbar.classList.remove("hidden");
            isHidden = false;
          }
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });

  document.getElementById("logo-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
