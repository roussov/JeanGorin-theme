// ==============================
// parallax.js — Jean Gorin Theme
// ==============================
// Effet parallax fluide, responsive, sécurisé
// Compatible Chrome, Firefox, Safari, Edge, Android, iOS

document.addEventListener("DOMContentLoaded", () => {
  const parallaxSections = document.querySelectorAll(".parallax");

  if (!parallaxSections.length) return;

  const isMobile = /Mobi|Android|iPhone|iPad|Touch/i.test(navigator.userAgent);
  const allowMobileParallax = document.body.dataset.allowParallaxOnMobile === "true";

  if (isMobile && !allowMobileParallax) return;

  if (typeof window.requestAnimationFrame !== "function") {
    console.warn("⚠️ Parallax désactivé : requestAnimationFrame non supporté.");
    return;
  }

  let viewportHeight = window.innerHeight;
  let ticking = false;

  /**
   * Met à jour les positions parallax
   */
  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxSections.forEach(section => {
      try {
        const speed = parseFloat(section.dataset.speed) || 0.3;
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;

        if (rect.bottom < 0 || rect.top > viewportHeight) return;

        const offset = scrollY + viewportHeight - sectionTop;
        const bgY = Math.round(offset * speed);

        section.style.backgroundPosition = `center ${bgY}px`;

        const content = section.querySelector(".parallax-content");
        if (content) {
          content.style.transform = `translateY(${Math.round(bgY * 0.4)}px)`;
        }
      } catch (err) {
        console.error("❌ Erreur parallax :", section, err);
      }
    });
  }

  /**
   * Scroll listener optimisé
   */
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
    }
  }

  /**
   * Resize → mise à jour viewportHeight
   */
  function onResize() {
    viewportHeight = window.innerHeight;
    updateParallax();
  }

  // Événements
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });

  // Initialisation différée
  if ("requestIdleCallback" in window) {
    requestIdleCallback(updateParallax);
  } else {
    setTimeout(updateParallax, 100);
  }
});
