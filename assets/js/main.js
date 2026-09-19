/* ============================================================
   Karma Foods — nav, dot indicator, reveal-on-scroll
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Intro / preloader ---------- */
  var intro = document.getElementById("intro");
  if (intro) {
    var docEl = document.documentElement;
    docEl.classList.add("intro-lock");
    var dismissed = false;
    function dismissIntro() {
      if (dismissed) return;
      dismissed = true;
      intro.classList.add("intro-hide");
      docEl.classList.remove("intro-lock");
      window.removeEventListener("keydown", onIntroKey);
      setTimeout(function () {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, 750);
    }
    function onIntroKey(e) {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") dismissIntro();
    }
    intro.addEventListener("click", dismissIntro);
    window.addEventListener("keydown", onIntroKey);
    var introReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(dismissIntro, introReduceMotion ? 400 : 2200);
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Day / night toggle ---------- */
  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    var htmlEl = document.documentElement;
    function applyTheme(mode, persist) {
      if (mode === "day") htmlEl.setAttribute("data-theme", "day");
      else htmlEl.removeAttribute("data-theme");
      themeToggle.setAttribute("aria-pressed", mode === "day" ? "true" : "false");
      themeToggle.setAttribute("aria-label", mode === "day" ? "Switch to night mode" : "Switch to day mode");
      if (persist) {
        try { localStorage.setItem("karma-theme", mode); } catch (e) {}
      }
      window.dispatchEvent(new CustomEvent("karma:theme", { detail: mode }));
    }
    applyTheme(htmlEl.getAttribute("data-theme") === "day" ? "day" : "night", false);
    themeToggle.addEventListener("click", function () {
      applyTheme(htmlEl.getAttribute("data-theme") === "day" ? "night" : "day", true);
    });
  }

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

  /* ---------- Crate build animation (fruit fills box, lid closes, carton reveals) ---------- */
  var crateEls = document.querySelectorAll(".crate");
  if ("IntersectionObserver" in window) {
    var crateObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-filling");
          crateObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    crateEls.forEach(function (el) { crateObserver.observe(el); });
  } else {
    crateEls.forEach(function (el) { el.classList.add("is-filling"); });
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
    default: "var(--brand-orange)",
    agro: "var(--agro)",
    ricchi: "var(--ricchi)",
    citra: "var(--citra)",
    cleo: "var(--cleo)",
    mello: "var(--mello)",
    contact: "var(--brand-orange)"
  };

  function setActiveTheme(theme) {
    document.documentElement.style.setProperty("--theme-accent", THEME_VARS[theme] || "var(--brand-orange)");
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
