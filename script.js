document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "919422938680";
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const header = document.querySelector(".site-header");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });
  }

  if (header) {
    const toggleHeaderState = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    toggleHeaderState();
    window.addEventListener("scroll", toggleHeaderState, { passive: true });
  }

  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll("[data-link]").forEach((link) => {
      if (link.dataset.link === page) link.classList.add("active");
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));

  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const getInputValue = (form, selectors) => {
    for (const selector of selectors) {
      const el = form.querySelector(selector);
      if (el && el.value && el.value.trim()) return el.value.trim();
    }
    return "";
  };

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = getInputValue(form, ['input[name="name"]', 'input[placeholder*="Name"]']);
      const phone = getInputValue(form, ['input[name="phone"]', 'input[type="tel"]']);
      const businessType = getInputValue(form, ['select[name="business_type"]']);
      const requirement = getInputValue(form, ['textarea[name="requirement"]', 'textarea']);
      const businessName = getInputValue(form, ['input[name="business"]', 'input[placeholder*="Business"]']);

      const messageLines = [
        "Hi Vyapaarx, I want a free consultation.",
        "",
        name ? `Name: ${name}` : "",
        phone ? `Phone: ${phone}` : "",
        businessName ? `Business: ${businessName}` : "",
        businessType ? `Business Type: ${businessType}` : "",
        requirement ? `Requirement: ${requirement}` : "",
      ].filter(Boolean);

      const message = encodeURIComponent(messageLines.join("\n"));
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

      window.open(whatsappUrl, "_blank", "noopener");
      form.reset();
    });
  });
});
