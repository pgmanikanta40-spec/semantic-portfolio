(function () {
  const storageKey = "portfolio-theme";
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const toggles = document.querySelectorAll("[data-theme-toggle]");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function getPreferredTheme() {
    return getStoredTheme() || (darkQuery.matches ? "dark" : "light");
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;

    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#111827" : "#f6f4ef");
    }

    toggles.forEach((toggle) => {
      const label = toggle.querySelector("[data-theme-toggle-label]");
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");

      if (label) {
        label.textContent = isDark ? "Light" : "Dark";
      }
    });
  }

  applyTheme(getPreferredTheme());

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      storeTheme(nextTheme);
      applyTheme(nextTheme);
    });
  });

  darkQuery.addEventListener("change", () => {
    if (!getStoredTheme()) {
      applyTheme(getPreferredTheme());
    }
  });
})();
