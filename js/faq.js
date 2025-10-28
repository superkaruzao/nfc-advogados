export function setupFAQ() {
  const faqContainer = document.querySelector(".faq-container");
  const faqItems = document.querySelectorAll(".faq-item");
  const faqButtons = document.querySelectorAll(".faq-question");

  if (!faqContainer) return;

  const observerFAQ = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.3 }
  );
  observerFAQ.observe(faqContainer);

  const faqCascataObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          faqItems.forEach((item, index) => {
            setTimeout(() => item.classList.add("visible"), index * 150);
          });
          faqCascataObserver.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  faqCascataObserver.observe(faqContainer);

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.parentElement;
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) item.classList.remove("active");
      });
      faqItem.classList.toggle("active");
    });
  });
}
