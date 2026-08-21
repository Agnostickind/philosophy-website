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