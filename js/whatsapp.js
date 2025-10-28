export function setupWhatsApp() {
  const phoneNumber = "5519996063126";
  const whatsappLink = document.getElementById("whatsappLink");
  if (!whatsappLink) return;

  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
  const base = isMobile ? "https://api.whatsapp.com/send" : "https://wa.me";
  whatsappLink.href = `${base}/${phoneNumber}`;
}
