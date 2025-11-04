export function setupNavbar() {
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById("navbar");
  const hero = document.getElementById("hero");
  let isHidden = false;
  let ticking = false;

  function updateNavbar() {
    const currentScrollY = window.scrollY;
    const heroTop = hero.offsetTop;
    const heroBottom = heroTop + hero.offsetHeight;

    if (currentScrollY >= heroTop && currentScrollY < heroBottom) {
      navbar.classList.add("fixed");
    } else {
      navbar.classList.remove("fixed");
    }

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
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });

  document.getElementById("logo-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
