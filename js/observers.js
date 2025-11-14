export function setupObservers() {
  const createObserver = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
  };

  createObserver(".hero-content");
  createObserver(".reasons-container");
  createObserver(".consulting-container");
  createObserver(".about-container");

  const footer = document.querySelector(".footer");
  if (footer) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-section");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    fadeObserver.observe(footer);
  }
}
