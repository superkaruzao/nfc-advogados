export function setupHeroMotion() {
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  const oceanBg = document.querySelector(".ocean-bg");

  if (!hero || !heroContent || !oceanBg) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) heroContent.classList.add("visible");
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(heroContent);

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    const triggerPoint = heroHeight * 0.3;

    // Transição de fundo
    if (scrollY > triggerPoint) {
      hero.classList.add("scrolled");
    } else {
      hero.classList.remove("scrolled");
    }

    // Paralaxe do mar
    if (hero.classList.contains("scrolled")) {
      const parallaxOffset = (scrollY - triggerPoint) * 0.15;
      oceanBg.style.transform = `translateY(${parallaxOffset}px) scale(1)`;
    } else {
      oceanBg.style.transform = "translateY(0) scale(1.05)";
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
}
