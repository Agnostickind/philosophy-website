/* =========================================================
   WORLD LITERATURE — behaviour add-ons
   Load order: script.js → books-enhance.js → literature-enhance.js
   books-enhance.js already handles: skip link, reveals, card
   alt-text/fallbacks, category-nav scroll spy, menu closing.
   This file only covers Literature-specific bits.
   No fixed or sticky elements are created on any breakpoint.
   ========================================================= */
(function () {
  'use strict';

  const onReady = (fn) =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn)
      : fn();

  onReady(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* 1. Award and region blocks join the reveal animation */
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const extra = document.querySelectorAll('.award-category, .world-card');
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
      );
      extra.forEach((el) => {
        el.classList.add('bk-reveal');
        io.observe(el);
      });
    }

    /* 2. Award lists: readable names for external links + safe rel */
    document.querySelectorAll('.award-category').forEach((cat) => {
      const prize = cat.querySelector('h3');
      cat.querySelectorAll('a[target="_blank"]').forEach((a) => {
        a.rel = 'noopener noreferrer';
        if (prize) {
          a.setAttribute(
            'aria-label',
            a.textContent.trim() + ' — ' + prize.textContent.trim() + ' (opens in a new tab)'
          );
        }
      });
    });

    /* 3. Region flags/emoji are decoration, not content */
    document.querySelectorAll('.world-icon').forEach((el) => {
      el.setAttribute('aria-hidden', 'true');
    });

    /* 4. Award/region sections get proper labels for screen readers */
    document.querySelectorAll('main section:not([id]) > h2').forEach((h2, i) => {
      if (!h2.id) h2.id = 'lit-sec-' + i;
      h2.parentElement.setAttribute('aria-labelledby', h2.id);
    });

    /* 5. Long book titles inside cards should never overflow */
    document.querySelectorAll('.book-card h3, .book-card h4').forEach((el) => {
      el.style.overflowWrap = 'anywhere';
    });
  });
})();

/* =========================================================
   LITERATURE SIDE NAVIGATION
   nav-reverse = right-side navigation
   ========================================================= */

const literatureSideNav =
  document.querySelector('.literature-side-nav');

const literatureSideLinks = Array.from(
  document.querySelectorAll(
    '.literature-side-nav a[href^="#"]'
  )
);

const literatureSections = literatureSideLinks
  .map((link) => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);

    return section ? { section, link } : null;
  })
  .filter(Boolean);


/* =========================================================
   1. SHOW SIDE NAV AFTER HERO
   ========================================================= */

if (literatureSideNav) {

  const hero = document.querySelector('.home-hero');

  if (
    hero &&
    'IntersectionObserver' in window
  ) {

    const heroObserver = new IntersectionObserver(
      (entries) => {

        const entry = entries[0];

        if (!entry.isIntersecting) {
          literatureSideNav.classList.add(
            'literature-side-nav-visible'
          );
        } else {
          literatureSideNav.classList.remove(
            'literature-side-nav-visible'
          );
        }

      },
      {
        threshold: 0
      }
    );

    heroObserver.observe(hero);

  } else if (hero) {

    const updateLiteratureSideNav = () => {

      const heroBottom =
        hero.getBoundingClientRect().bottom;

      if (heroBottom <= 110) {

        literatureSideNav.classList.add(
          'literature-side-nav-visible'
        );

      } else {

        literatureSideNav.classList.remove(
          'literature-side-nav-visible'
        );

      }
    };

    window.addEventListener(
      'scroll',
      updateLiteratureSideNav,
      { passive: true }
    );

    updateLiteratureSideNav();
  }
}


/* =========================================================
   2. ACTIVE LITERATURE COLLECTION
   ========================================================= */

if (
  literatureSections.length &&
  'IntersectionObserver' in window
) {

  const literatureSectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          literatureSideLinks.forEach((link) => {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
          });

          const activeItem =
            literatureSections.find(
              (item) => item.section === entry.target
            );

          if (activeItem) {

            activeItem.link.classList.add(
              'is-active'
            );

            activeItem.link.setAttribute(
              'aria-current',
              'true'
            );
          }

        });

      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0
      }
    );

  literatureSections.forEach(({ section }) => {
    literatureSectionObserver.observe(section);
  });
}


/* =========================================================
   3. CLICK STATE
   ========================================================= */

literatureSideLinks.forEach((link) => {

  link.addEventListener('click', () => {

    literatureSideLinks.forEach((item) => {
      item.classList.remove('is-active');
      item.removeAttribute('aria-current');
    });

    link.classList.add('is-active');

    link.setAttribute(
      'aria-current',
      'true'
    );

  });

});