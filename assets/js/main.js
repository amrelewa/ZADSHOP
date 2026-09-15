/* ============================================================
   Karma Foods — nav, dot indicator, reveal-on-scroll
   ============================================================ */
(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Active section -> dot nav + body theme ---------- */
  var sections = document.querySelectorAll("main .section");
  var dots = document.querySelectorAll("#dotNav a");

  function dotKeyFor(theme) {
    if (theme === "default") return "hero";
    if (theme === "citra") return "citra";
    return theme;
  }

  var THEME_VARS = {
    default: "var(--gold)",
    agro: "var(--agro)",
    ricchi: "var(--ricchi)",
    citra: "var(--citra)",
    cleo: "var(--cleo)",
    mello: "var(--mello)",
    contact: "var(--gold)"
  };

  function setActiveTheme(theme) {
    document.documentElement.style.setProperty("--theme-accent", THEME_VARS[theme] || "var(--gold)");
    var dotKey = dotKeyFor(theme);
    dots.forEach(function (d) {
      d.classList.toggle("active", d.getAttribute("data-dot") === dotKey);
    });
  }

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveTheme(entry.target.getAttribute("data-theme") || "default");
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }
})();
