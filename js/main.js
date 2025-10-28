import { setupNavbar } from "./navbar.js";
import { setupWhatsApp } from "./whatsapp.js";
import { setupObservers } from "./observers.js";
import { setupSlider } from "./slider.js";
import { setupFAQ } from "./faq.js";
import { setupFooter } from "./footer.js";

document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupWhatsApp();
  setupObservers();
  setupSlider();
  setupFAQ();
  setupFooter();
});