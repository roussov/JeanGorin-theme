// =============================
// main.js — Jean Gorin Theme
// =============================

// 1. Navbar auto-hide (dans DOMContentLoaded, header sûr d’être trouvé)
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (!header) return;
    // On cache le header si on descend (mais pas si tout en haut)
    if (window.scrollY > lastScrollY && window.scrollY > 60) {
      header.style.top = `-${header.offsetHeight + 6}px`;
    } else {
      header.style.top = "0";
    }
    lastScrollY = window.scrollY;
  });

  // 2. Burger menu responsive
  const nav = document.querySelector("nav");
  const navToggle = document.getElementById("nav-toggle");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      navToggle.classList.toggle("open"); // Pour l’animation burger
    });
  }

  // 3. Scroll ancre custom (offset header)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === "#" || !document.querySelector(id)) return;
      e.preventDefault();
      const target = document.querySelector(id);
      // Prend bien la hauteur dynamique du header
      const headerHeight = header ? header.offsetHeight : 74;
      const rect = target.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - headerHeight + 2;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      // Ferme nav mobile si besoin
      if (nav && nav.classList.contains("open")) nav.classList.remove("open");
      if (navToggle && navToggle.classList.contains("open")) navToggle.classList.remove("open");
    });
  });

  // 4. Animation reveal (pour ".reveal" etc.)
  const reveals = document.querySelectorAll(".reveal, .slide-left, .slide-right, .zoom-on-reveal, .fade-in");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }
});
