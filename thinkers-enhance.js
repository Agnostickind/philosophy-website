/* =========================================================
   LIBRARY OF PHILOSOPHY â€” thinkers page enhancement
   Load AFTER script.js:
      <script src="script.js" defer></script>
     <script src="article-toc.js" defer></script>
     <script src="home-enhance.js" defer></script>
     <script src="thinkers-enhance.js" defer></script>
   Adds: skip link, emoji hidden from screen readers,
   scroll reveal, active state in the quick-jump nav,
   and a portrait fallback. No structural markup changes.
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

    /* --- 2. Emoji in headings hidden from screen readers */
    var EMOJI = /^([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\s]+)/u;
    document.querySelectorAll('.thinker-info h2, .era-divider span').forEach(function (el) {
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

    /* --- 3. Portraits: keep the circle even if missing -- */
    document.querySelectorAll('.thinker-portrait img').forEach(function (img) {
      img.addEventListener('error', function () {
        var fig = img.closest('.thinker-portrait');
        if (fig) fig.remove();
      });
    });

    /* --- 4. Scroll reveal ------------------------------ */
    var targets = document.querySelectorAll('.thinker, .era-divider');
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

    /* --- 5. Quick-jump nav highlights the current era --- */
    var links = Array.prototype.slice.call(document.querySelectorAll('.category-nav a[href^="#"]'));
    var eras = links.map(function (a) {
      return document.getElementById(decodeURIComponent(a.hash.slice(1)));
    });
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a, i) {
            if (eras[i] === e.target) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-25% 0px -60% 0px' });
      eras.forEach(function (el) { if (el) spy.observe(el); });
    }
  });
})();
/* =========================================================
   REVERSE SIDE NAVIGATION
   Right-side navigation for philosophical traditions
   ========================================================= */

(function () {

  'use strict';

  const onReady = (fn) => {

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }

  };


  onReady(function () {

    const nav = document.querySelector('.category-nav.nav-reverse');

    if (!nav) return;


    const links = Array.from(
      nav.querySelectorAll('a[href^="#"]')
    );


    if (!links.length) return;


    /* =====================================================
       FIND HERO
       ===================================================== */

    const hero =
      document.querySelector('.home-hero') ||
      document.querySelector('header.home-hero');


    /* =====================================================
       SHOW / HIDE SIDE NAV
       ===================================================== */

    const showNav = () => {

      nav.classList.add('nav-reverse-visible');

    };


    const hideNav = () => {

      nav.classList.remove('nav-reverse-visible');

    };


    if (hero && 'IntersectionObserver' in window) {

      const heroObserver = new IntersectionObserver(

        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              hideNav();

            } else {

              showNav();

            }

          });

        },

        {
          threshold: 0.05
        }

      );


      heroObserver.observe(hero);

    } else {

      showNav();

    }


    /* =====================================================
       MAP LINKS TO SECTIONS
       ===================================================== */

    const sections = [];

    links.forEach((link) => {

      const id =
        link.getAttribute('href').substring(1);

      const section =
        document.getElementById(id);

      if (section) {

        sections.push({
          link: link,
          section: section
        });

      }

    });


    if (!sections.length) return;


    /* =====================================================
       ACTIVE SECTION
       ===================================================== */

    const setActive = (activeLink) => {

      links.forEach((link) => {

        link.classList.remove('is-active');

        link.removeAttribute('aria-current');

      });


      if (activeLink) {

        activeLink.classList.add('is-active');

        activeLink.setAttribute(
          'aria-current',
          'location'
        );

      }

    };


    /* =====================================================
       INTERSECTION OBSERVER
       ===================================================== */

    if ('IntersectionObserver' in window) {

      const sectionObserver =
        new IntersectionObserver(

          (entries) => {

            const visible = entries
              .filter(entry => entry.isIntersecting)
              .sort(
                (a, b) =>
                  a.boundingClientRect.top -
                  b.boundingClientRect.top
              );


            if (!visible.length) return;


            const currentSection =
              visible[0].target;


            const match =
              sections.find(
                item =>
                  item.section === currentSection
              );


            if (match) {

              setActive(match.link);

            }

          },

          {
            rootMargin: '-20% 0px -55% 0px',
            threshold: 0
          }

        );


      sections.forEach((item) => {

        sectionObserver.observe(item.section);

      });

    }


    /* =====================================================
       SMOOTH JUMP
       ===================================================== */

    links.forEach((link) => {

      link.addEventListener('click', function (event) {

        const id =
          this.getAttribute('href').substring(1);

        const target =
          document.getElementById(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({

          behavior:
            window.matchMedia(
              '(prefers-reduced-motion: reduce)'
            ).matches
              ? 'auto'
              : 'smooth',

          block: 'start'

        });

        setActive(this);

      });

    });

  });

})();