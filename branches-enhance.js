/* =========================================================
   LIBRARY OF PHILOSOPHY â€” branches page enhancement
   Load AFTER script.js:
     <script src="script.js" defer></script>
     <script src="home-enhance.js" defer></script>
     <script src="branches-enhance.js" defer></script>
   Adds: skip link, reading progress, scroll reveal,
   active state in the branch jump nav, emoji hidden from
   screen readers, image fallback. No content rewriting.
   ========================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) document.documentElement.classList.add('js-motion');

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* --- 1. Skip link ---------------------------------- */
    var main = document.getElementById('main-content') || document.querySelector('main');
    if (main && !document.querySelector('.skip-link')) {
      var skip = document.createElement('a');
      skip.className = 'skip-link visually-hidden';
      skip.href = '#main-content';
      skip.textContent = 'Skip to content';
      skip.addEventListener('focus', function () { skip.classList.remove('visually-hidden'); });
      skip.addEventListener('blur', function () { skip.classList.add('visually-hidden'); });
      document.body.insertBefore(skip, document.body.firstChild);
    }

    /* --- 2. Reading progress bar ----------------------- */
    if (!reduce && !document.querySelector('.reading-progress')) {
      var bar = document.createElement('div');
      bar.className = 'reading-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
      var ticking = false;
      var update = function () {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
      update();
    }

    /* --- 3. Emoji in headings hidden from screen readers */
    var EMOJI = /^([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\s]+)/u;
    document.querySelectorAll('.branch-content h2, .tree-root').forEach(function (el) {
      var m = EMOJI.exec(el.textContent);
      if (!m || !m[1].trim()) return;
      var rest = el.textContent.slice(m[1].length);
      el.textContent = '';
      var glyph = document.createElement('span');
      glyph.setAttribute('aria-hidden', 'true');
      glyph.textContent = m[1].trim() + ' ';
      el.appendChild(glyph);
      el.appendChild(document.createTextNode(rest));
    });

    /* --- 4. Missing artwork should not leave a gap ----- */
    document.querySelectorAll('.branch-image img').forEach(function (img) {
      img.addEventListener('error', function () {
        var fig = img.closest('.branch-image');
        if (fig) fig.remove();
      });
    });

    /* --- 5. Scroll reveal ------------------------------ */
    var targets = document.querySelectorAll('.branch, .tree-box, .comparison, .quote, .connection');
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
      targets.forEach(function (el) { io.observe(el); });
    }

    /* --- 6. Jump nav highlights the current branch ----- */
    var links = Array.prototype.slice.call(document.querySelectorAll('.branch-nav a[href^="#"]'));
    var sections = links.map(function (a) {
      return document.getElementById(decodeURIComponent(a.hash.slice(1)));
    });
    if (links.length && 'IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a, i) {
            if (sections[i] === e.target) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
      sections.forEach(function (s) { if (s) spy.observe(s); });
    }
  });
})();

/* =========================================================
BRANCHES — SIDE NAV ACTIVE SECTION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
const sideLinks = document.querySelectorAll(
".branch-side-nav a[data-branch-target]"
);

const sections = [...sideLinks]
.map(link => document.getElementById(link.dataset.branchTarget))
.filter(Boolean);

if (!sideLinks.length || !sections.length) return;

const setActive = id => {
sideLinks.forEach(link => {
const isActive = link.dataset.branchTarget === id;


  link.classList.toggle("is-active", isActive);

  if (isActive) {
    link.setAttribute("aria-current", "location");
  } else {
    link.removeAttribute("aria-current");
  }
});


};

const observer = new IntersectionObserver(
entries => {
const visibleSections = entries
.filter(entry => entry.isIntersecting)
.sort(
(a, b) =>
b.intersectionRatio - a.intersectionRatio
);

  if (visibleSections.length) {
    setActive(visibleSections[0].target.id);
  }
},
{
  root: null,
  rootMargin: "-20% 0px -55% 0px",
  threshold: [0, 0.25, 0.5, 0.75]
}


);

sections.forEach(section => observer.observe(section));

/* Smooth jump with sticky-header offset */
sideLinks.forEach(link => {
link.addEventListener("click", event => {
const target = document.getElementById(
link.dataset.branchTarget
);


  if (!target) return;

  event.preventDefault();

  target.scrollIntoView({
    behavior: window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
      ? "auto"
      : "smooth",
    block: "start"
  });

  setActive(target.id);

  history.replaceState(
    null,
    "",
    `#${target.id}`
  );
});

});
});

/* =========================================================
   BRANCH SIDE NAV — HERO + FOOTER VISIBILITY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector(".home-hero");
  const branchNav = document.querySelector(".branch-nav");
  const footer = document.querySelector("footer");

  if (!branchNav) return;


  /* =======================================================
     UPDATE NAVIGATION VISIBILITY
     
     HERO   = hidden
     CONTENT = visible
     FOOTER = hidden
     ======================================================= */

  const updateBranchNavVisibility = () => {

    let heroVisible = false;
    let footerVisible = false;


    /* ---------- HERO ---------- */

    if (hero) {

      const heroRect = hero.getBoundingClientRect();

      heroVisible = heroRect.bottom > 0;
    }


    /* ---------- FOOTER ---------- */

    if (footer) {

      const footerRect = footer.getBoundingClientRect();

      footerVisible = footerRect.top < window.innerHeight;
    }


    /* ---------- FINAL STATE ---------- */

    if (heroVisible || footerVisible) {

      branchNav.classList.remove(
        "branch-nav-visible"
      );

    } else {

      branchNav.classList.add(
        "branch-nav-visible"
      );

    }
  };


  /* =======================================================
     SCROLL
     ======================================================= */

  window.addEventListener(
    "scroll",
    updateBranchNavVisibility,
    { passive: true }
  );


  /* =======================================================
     RESIZE
     ======================================================= */

  window.addEventListener(
    "resize",
    updateBranchNavVisibility
  );


  /* =======================================================
     INITIAL CHECK
     ======================================================= */

  updateBranchNavVisibility();

});