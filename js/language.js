// Language switching: persists the chosen language and applies translations to the DOM.
const LANGUAGE_KEY = "language";
const DEFAULT_LANGUAGE = "hy";

function getLanguage() {
  return localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
}

function t(key, lang) {
  const dict = translations[lang || getLanguage()] || translations[DEFAULT_LANGUAGE];
  return key.split(".").reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined), dict);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = t(el.getAttribute("data-i18n"), lang);
    if (value === undefined) {
      return;
    }
    const attr = el.getAttribute("data-i18n-attr");
    if (attr) {
      el.setAttribute(attr, value);
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });

  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

function setLanguage(lang) {
  localStorage.setItem(LANGUAGE_KEY, lang);
  applyLanguage(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(getLanguage());
});

// Delegated click handler: works even though the language buttons don't exist
// yet when this script runs (it's loaded at the very top of <body>).
document.addEventListener("click", (event) => {
  const btn = event.target.closest(".lang-btn");
  if (!btn) {
    return;
  }
  setLanguage(btn.dataset.lang);
});
