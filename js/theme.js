// Apply the saved theme immediately (before header/content render) to avoid a flash of the wrong theme.
(function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
})();

// Delegated click handler: works even though the toggle button doesn't exist
// yet when this script runs (it's loaded at the very top of <body>).
document.addEventListener("click", function (event) {
  const toggle = event.target.closest("#theme-toggle");
  if (!toggle) {
    return;
  }

  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
