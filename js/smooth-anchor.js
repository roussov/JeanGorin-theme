// ===========================
// smooth-anchor.js — Jean Gorin Theme
// ===========================
// Gère les ancres avec scroll fluide, sans scroll automatique au chargement.

document.addEventListener("DOMContentLoaded", () => {
  // Supprime scroll automatique vers l’ancre si présente dans l’URL
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }

  // Clic fluide vers les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const targetId = anchor.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    anchor.addEventListener("click", event => {
      if (targetElement) {
        event.preventDefault();

        // Scroll fluide
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

        // Facultatif : ne pas ajouter le hash à l'URL
        // history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  });
});
