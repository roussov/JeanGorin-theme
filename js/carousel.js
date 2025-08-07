// ===============================
// carousel.js — Jean Gorin Theme
// ===============================
// Carrousel ultra complet : tactile, clavier, autoplay, pagination, responsive, focus, etc.

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel-item");
    if (items.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval;
    const autoplayDelay = parseInt(carousel.dataset.autoplayDelay) || 4000;

    const prevBtn = carousel.parentElement.querySelector(".carousel-prev");
    const nextBtn = carousel.parentElement.querySelector(".carousel-next");
    const pagination = carousel.parentElement.querySelector(".carousel-pagination");

    // === ACCESSIBILITÉ ===
    items.forEach((item, index) => {
      item.setAttribute("role", "group");
      item.setAttribute("aria-label", `Diapositive ${index + 1} sur ${items.length}`);
      item.setAttribute("tabindex", index === 0 ? "0" : "-1");
    });

    // === MISE À JOUR DE L'AFFICHAGE ===
    function updateView() {
      items.forEach((item, i) => {
        item.classList.toggle("active", i === currentIndex);
        item.setAttribute("tabindex", i === currentIndex ? "0" : "-1");
        // **PAS de scrollIntoView ici !**
      });

      if (pagination) {
        const dots = pagination.querySelectorAll("button");
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === currentIndex);
          dot.setAttribute("aria-pressed", i === currentIndex ? "true" : "false");
        });
      }
    }

    // === NAVIGATION ===
    function goTo(index) {
      if (index < 0) index = 0;
      if (index >= items.length) index = items.length - 1;
      currentIndex = index;
      updateView();
    }

    function next() {
      goTo((currentIndex + 1) % items.length);
    }

    function prev() {
      goTo((currentIndex - 1 + items.length) % items.length);
    }

    // === AUTOPLAY ===
    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(next, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    // Pause autoplay au survol
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    // === TOUCH EVENTS ===
    let startX = 0;

    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const delta = startX - endX;

      if (Math.abs(delta) > 30) {
        delta > 0 ? next() : prev();
      }
    });

    // === CLAVIER ===
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    });

    // === BOUTONS ===
    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);

    // === PAGINATION ===
    if (pagination) {
      pagination.innerHTML = "";
      items.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Aller à la diapositive ${i + 1}`);
        dot.classList.add("carousel-dot");
        dot.addEventListener("click", () => goTo(i));
        pagination.appendChild(dot);
      });
    }

    // === INITIALISATION ===
    updateView();
    startAutoplay();
  });
});
