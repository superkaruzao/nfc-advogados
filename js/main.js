import { setupNavbar } from "./navbar.js";
import { setupWhatsApp } from "./whatsapp.js";
import { setupObservers } from "./observers.js";
import { setupSlider } from "./slider.js";
import { setupFAQ } from "./faq.js";
import { setupFooter } from "./footer.js";
import { setupHeroMotion } from "./hero.js";

document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupWhatsApp();
  setupHeroMotion();
  setupObservers();
  setupSlider();
  setupFAQ();
  setupFooter();
});