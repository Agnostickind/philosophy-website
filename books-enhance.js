/* =========================================================
   BOOKS PAGE — behaviour layer
   Load AFTER script.js:  script.js → books-enhance.js
   Deliberately adds NO fixed/sticky element on mobile.
   ========================================================= */
(function () {
  'use strict';

  const onReady = (fn) =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn)
      : fn();

  onReady(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = () => window.matchMedia('(min-width: 1025px)').matches;

    /* 1. Skip link (only if the HTML doesn't already have one) */
    if (!document.querySelector('.skip-link')) {
      const skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#main-content';
      skip.textContent = 'Skip to content';
      document.body.prepend(skip);
    }

    /* 2. Emoji in headings shouldn't be read aloud as words */
    document.querySelectorAll('main h2 > span:first-child').forEach((s) => {
      if (s.textContent.trim().length <= 3) s.setAttribute('aria-hidden', 'true');
    });

    /* 3. Describe each collection section for screen readers */
    document.querySelectorAll('main section[id] > h2').forEach((h2, i) => {
      const sec = h2.parentElement;
      if (!h2.id) h2.id = 'sec-' + (sec.id || 'section-' + i);
      sec.setAttribute('aria-labelledby', h2.id);
    });

    /* 4. Book cards: alt text fallback + broken-cover cleanup */
    document.querySelectorAll('.book-card').forEach((card) => {
      const img = card.querySelector('.book-cover img');
      const title = card.querySelector('h3');
      const author = card.querySelector('h4');
      if (img) {
        if (!img.alt && title) {
          img.alt = 'Cover of ' + title.textContent.trim();
        } else if (img.alt && author && !/by /i.test(img.alt)) {
          img.alt = img.alt.trim() + ' by ' + author.textContent.trim();
        }
        img.addEventListener('error', () => {
          const cover = img.closest('.book-cover');
          if (!cover) return;
          img.remove();
          const ph = document.createElement('span');
          ph.textContent = 'Φ';
          ph.setAttribute('aria-hidden', 'true');
          ph.style.cssText =
            'display:grid;place-items:center;height:100%;font-size:2.4rem;opacity:.35;';
          cover.appendChild(ph);
        });
      }
      /* external read links: clear label + safe rel */
      const btn = card.querySelector('.read-btn');
      if (btn && title) {
        btn.setAttribute('aria-label', btn.textContent.trim() + ': ' + title.textContent.trim());
        if (btn.target === '_blank') btn.rel = 'noopener noreferrer';
      }
    });

    /* 5. Reveal-on-scroll for sections and cards */
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const targets = document.querySelectorAll(
        'main > section, .book-card, .featured-book, .spotlight-card, .level-card'
      );
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
      targets.forEach((t, i) => {
        t.classList.add('bk-reveal');
        if (i < 8) t.classList.add('is-visible'); // above the fold: no flash
        else io.observe(t);
      });
    }

    /* 6. Active state in the category nav (desktop only —
          on mobile the nav is not pinned, so it stays quiet) */
    const navLinks = Array.from(document.querySelectorAll('.category-nav a[href^="#"]'));
    if (navLinks.length && 'IntersectionObserver' in window) {
      const map = new Map();
      navLinks.forEach((a) => {
        const sec = document.getElementById(a.getAttribute('href').slice(1));
        if (sec) map.set(sec, a);
      });
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const link = map.get(e.target);
            if (!link) return;
            navLinks.forEach((a) => a.classList.remove('active'));
            link.classList.add('active');
            if (isDesktop() && link.parentElement) {
              const nav = link.parentElement;
              if (nav.scrollWidth > nav.clientWidth) {
                nav.scrollTo({ left: link.offsetLeft - nav.clientWidth / 2, behavior: 'smooth' });
              }
            }
          });
        },
        { rootMargin: '-25% 0px -65% 0px' }
      );
      map.forEach((_, sec) => spy.observe(sec));
    }

    /* 7. Close the mobile menu if a jump link is tapped, so the
          list never covers the section the reader jumped to */
    const mobileMenu = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    document.querySelectorAll('.category-nav a').forEach((a) => {
      a.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          if (menuToggle) {
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  });
})();

/* =========================================================
   BOOKS SIDE NAVIGATION
   Show after hero + highlight current collection
   ========================================================= */

const booksSideNav = document.querySelector('.books-side-nav');
const booksSideLinks = Array.from(
  document.querySelectorAll('.books-side-nav a[href^="#"]')
);

const bookSections = booksSideLinks
  .map((link) => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);

    return section ? { section, link } : null;
  })
  .filter(Boolean);


/* ---------------------------------------------------------
   2. ACTIVE COLLECTION
   --------------------------------------------------------- */

if (
  bookSections.length &&
  'IntersectionObserver' in window
) {

  const sectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        booksSideLinks.forEach((link) => {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        });

        const activeLink = bookSections.find(
          (item) => item.section === entry.target
        )?.link;

        if (activeLink) {
          activeLink.classList.add('is-active');
          activeLink.setAttribute(
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

  bookSections.forEach(({ section }) => {
    sectionObserver.observe(section);
  });
}


/* ---------------------------------------------------------
   3. SMOOTH JUMP + ACCESSIBILITY
   --------------------------------------------------------- */

booksSideLinks.forEach((link) => {

  link.addEventListener('click', () => {

    booksSideLinks.forEach((item) => {
      item.classList.remove('is-active');
      item.removeAttribute('aria-current');
    });

    link.classList.add('is-active');
    link.setAttribute('aria-current', 'true');

  });

});