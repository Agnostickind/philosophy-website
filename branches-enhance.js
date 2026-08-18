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