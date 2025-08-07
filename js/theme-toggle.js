// =============================
// theme-toggle.js — Jean Gorin Theme
// =============================
// Gestion complète du mode clair / sombre avec :
// - persistance via localStorage
// - détection préférences système
// - synchronisation dynamique
// - accessibilité renforcée
// - événement personnalisé "themeChanged"

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  const html = document.documentElement;

  if (!toggleButton) {
    console.warn("⚠️ Bouton #theme-toggle introuvable.");
    return;
  }

  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  /**
   * Applique un thème ("dark" ou "light")
   */
  function applyTheme(theme) {
    try {
      const isDark = theme === "dark";

      body.classList.toggle("dark-mode", isDark);
      body.classList.toggle("light-mode", !isDark);
      body.setAttribute("data-theme", theme);
      html.setAttribute("data-theme", theme); // synchronise aussi <html>

      toggleButton.textContent = isDark ? "☀️" : "🌙";
      toggleButton.setAttribute("aria-label", isDark ? "Passer en mode clair" : "Passer en mode sombre");
      toggleButton.setAttribute("title", isDark ? "Mode clair" : "Mode sombre");

      localStorage.setItem("theme", theme);

      document.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme } }));
    } catch (e) {
      console.error("❌ Erreur lors de l'application du thème :", e);
    }
  }

  /**
   * Initialise le thème au chargement
   */
  function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
    } else {
      applyTheme(systemPrefersDark.matches ? "dark" : "light");
    }
  }

  /**
   * Inverse le thème actuel
   */
  function toggleTheme() {
    try {
      const isCurrentlyDark = body.classList.contains("dark-mode");
      applyTheme(isCurrentlyDark ? "light" : "dark");
    } catch (e) {
      console.error("❌ Erreur dans toggleTheme :", e);
    }
  }

  /**
   * Surveille les préférences système (si aucune préférence locale)
   */
  function watchSystemPreference() {
    systemPrefersDark.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }

  // Initialisation
  toggleButton.addEventListener("click", toggleTheme);
  initTheme();
  watchSystemPreference();
});
