let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");
let hideTimeout = null;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    clearTimeout(hideTimeout);

    navbar.classList.remove("hidden");
    hideTimeout = setTimeout(() => {
      navbar.classList.add("hidden");
    }, 100);
  } else {
    clearTimeout(hideTimeout);
    navbar.classList.remove("hidden");
  }

  lastScrollY = currentScrollY;
});

document.getElementById("logo-link").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const phoneNumber = "5519996063126";

const whatsappFloat = document.getElementById("whatsappFloat");
const whatsappLink = document.getElementById("whatsappLink");

function setWhatsAppLink() {
  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
  const base = isMobile ? "https://api.whatsapp.com/send" : "https://wa.me";
  whatsappLink.href = `${base}/${phoneNumber}`;
}

setWhatsAppLink();

const heroContent = document.querySelector(".hero-content");

if (heroContent) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(heroContent);
}

const reasonsContainer = document.querySelector(".reasons-container");

if (reasonsContainer) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(reasonsContainer);
}

const consultingContainer = document.querySelector(".consulting-container");

if (consultingContainer) {
  const observerConsulting = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  observerConsulting.observe(consultingContainer);
}

const aboutContainer = document.querySelector(".about-container");

if (aboutContainer) {
  const observerAbout = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  observerAbout.observe(aboutContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const reviewsWrapper = document.querySelector(".slider-wrapper");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!slider || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  let total = slider.children.length;
  let autoplayInterval = null;
  let isAutoplayPaused = false;

  const getVisibleCards = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  };

  const moveSlider = (animate = true) => {
    const card = slider.querySelector(".review-card");
    if (!card) return;

    const cardWidth = card.offsetWidth + 10;
    const visible = getVisibleCards();
    const maxSlide = Math.ceil(total / visible) - 1;

    if (currentSlide > maxSlide) currentSlide = 0;
    if (currentSlide < 0) currentSlide = maxSlide;

    const translateX = -currentSlide * cardWidth * visible;
    slider.style.transition = animate ? "transform 0.5s ease" : "none";
    slider.style.transform = `translateX(${translateX}px)`;

    updateDots();
  };

  const createDots = () => {
    dotsContainer.innerHTML = "";
    const visible = getVisibleCards();
    const dotCount = Math.ceil(total / visible);
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentSlide = i;
        moveSlider();
        pauseAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  };

  const updateDots = () => {
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  };

  const startAutoplay = () => {
    if (isAutoplayPaused) return;
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      currentSlide++;
      moveSlider();
    }, 6000);
  };

  const stopAutoplay = () => clearInterval(autoplayInterval);

  const pauseAutoplay = () => {
    isAutoplayPaused = true;
    stopAutoplay();
  };

  const resumeAutoplay = () => {
    if (!isAutoplayPaused) return;
    isAutoplayPaused = false;
    startAutoplay();
  };

  prevBtn.addEventListener("click", () => {
    currentSlide--;
    moveSlider();
    pauseAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    currentSlide++;
    moveSlider();
    pauseAutoplay();
  });

  window.addEventListener("resize", () => {
    createDots();
    moveSlider(false);
  });

  const enableSwipe = () => {
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    const getPositionX = (event) =>
      event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;

    const touchStart = (event) => {
      isDragging = true;
      startX = getPositionX(event);
      prevTranslate = parseInt(slider.style.transform.replace("translateX(", "")) || 0;
      animationID = requestAnimationFrame(animation);
      pauseAutoplay();
    };

    const touchMove = (event) => {
      if (!isDragging) return;
      const currentPosition = getPositionX(event);
      const diff = currentPosition - startX;
      currentTranslate = prevTranslate + diff;
    };

    const touchEnd = () => {
      cancelAnimationFrame(animationID);
      isDragging = false;
      const movedBy = currentTranslate - prevTranslate;
      const threshold = 100;
      if (movedBy < -threshold) currentSlide++;
      if (movedBy > threshold) currentSlide--;
      moveSlider();
    };

    const animation = () => {
      slider.style.transform = `translateX(${currentTranslate}px)`;
      if (isDragging) requestAnimationFrame(animation);
    };

    slider.addEventListener("touchstart", touchStart, { passive: true });
    slider.addEventListener("touchmove", touchMove, { passive: true });
    slider.addEventListener("touchend", touchEnd);
  };

  if (/android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent)) {
    enableSwipe();
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pauseAutoplay();
        } else {
          resumeAutoplay();
        }
      });
    },
    { threshold: 0.6 }
  );

  if (reviewsWrapper) sectionObserver.observe(reviewsWrapper);

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.3 }
  );

  if (reviewsWrapper) fadeObserver.observe(reviewsWrapper);

  createDots();
  moveSlider(false);
  startAutoplay();
});

const faqContainer = document.querySelector(".faq-container");
const faqItems = document.querySelectorAll(".faq-item");

if (faqContainer) {
  const observerFAQ = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
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
            setTimeout(() => {
              item.classList.add("visible");
            }, index * 150);
          });
          faqCascataObserver.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  faqCascataObserver.observe(faqContainer);
}

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;

    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) item.classList.remove("active");
    });

    faqItem.classList.toggle("active");
  });
});

document.getElementById('currentYear').textContent = new Date().getFullYear();

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-section');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const footer = document.querySelector('.footer');
if (footer) fadeObserver.observe(footer);

var swiper = new Swiper(".swiper", {
    loop: true,
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 18
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 18
        },
        1188: {
            slidesPerView: 3,
            spaceBetween: 24
        }
    }
});