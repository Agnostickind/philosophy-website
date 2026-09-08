/* =========================================================
   THE GREAT LIBRARY OF PHILOSOPHY
   HOMEPAGE INTERACTION ENGINE
   index.js

   Homepage-only JavaScript.
   Does NOT replace script.js or nav-bar.js.
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     1. BASIC SETUP
     ======================================================= */

  const body = document.body;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /*
   * Only run homepage interactions on the homepage.
   * This prevents index.js from affecting internal pages.
   */
  const homePage =
    document.querySelector(".home-page") ||
    document.querySelector(".home-hero");

  if (!homePage) return;


  /* =======================================================
     2. SCROLL REVEAL
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".home-introduction, " +
    ".home-branches, " +
    ".home-library, " +
    ".home-civilizations, " +
    ".home-timeline, " +
    ".home-thinkers, " +
    ".home-beginner, " +
    ".home-final"
  );

  if (!prefersReducedMotion && revealElements.length) {

    revealElements.forEach((element) => {
      element.classList.add("home-js-reveal");
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("home-is-visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }


  /* =======================================================
     3. STAGGERED CARD REVEALS
     ======================================================= */

  const cardGroups = document.querySelectorAll(
    ".home-branches, " +
    ".home-library, " +
    ".home-civilizations, " +
    ".home-timeline, " +
    ".home-thinkers"
  );

  cardGroups.forEach((group) => {

    const cards = group.querySelectorAll(
      ".home-card, " +
      ".home-branch-card, " +
      ".home-library-card, " +
      ".home-civilization-card, " +
      ".home-timeline-item, " +
      ".home-thinker-card"
    );

    cards.forEach((card, index) => {

      card.style.setProperty(
        "--home-card-delay",
        `${Math.min(index * 70, 420)}ms`
      );

    });
  });


  /* =======================================================
     4. SCROLL PROGRESS
     ======================================================= */

  let progressBar = document.querySelector(
    ".home-scroll-progress"
  );

  /*
   * Create the progress bar automatically.
   * No extra HTML required.
   */
  if (!progressBar) {

    progressBar = document.createElement("div");

    progressBar.className = "home-scroll-progress";

    progressBar.setAttribute(
      "aria-hidden",
      "true"
    );

    body.appendChild(progressBar);
  }

  const updateScrollProgress = () => {

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.setProperty(
      "--home-scroll-progress",
      `${progress}%`
    );
  };

  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  updateScrollProgress();


  /* =======================================================
     5. HERO PARALLAX
     ======================================================= */

  const hero = document.querySelector(".home-hero");

  const heroHeading = hero
    ? hero.querySelector("h1")
    : null;

  const heroWatermark = hero
    ? hero.querySelector(
        ".home-hero-watermark, .home-hero-symbol"
      )
    : null;

  if (
    hero &&
    !prefersReducedMotion
  ) {

    let ticking = false;

    const updateHeroParallax = () => {

      const scrollY = window.scrollY;

      /*
       * Stop the effect once the hero is mostly gone.
       */
      if (scrollY < window.innerHeight) {

        if (heroHeading) {
          heroHeading.style.transform =
            `translate3d(0, ${scrollY * -0.035}px, 0)`;
        }

        if (heroWatermark) {
          heroWatermark.style.transform =
            `translate3d(0, ${scrollY * 0.025}px, 0)`;
        }

      }

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updateHeroParallax
          );

          ticking = true;
        }

      },
      { passive: true }
    );
  }


  /* =======================================================
     6. HERO MOUSE MOVEMENT
     ======================================================= */

  /*
   * Very subtle movement.
   * The typography should NOT chase the cursor.
   */

  if (
    hero &&
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    hero.addEventListener(
      "pointermove",
      (event) => {

        const rect = hero.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width;

        const y =
          (event.clientY - rect.top) /
          rect.height;

        const moveX =
          (x - 0.5) * 8;

        const moveY =
          (y - 0.5) * 5;

        if (heroHeading) {

          heroHeading.style.transform =
            `translate3d(${moveX}px, ${moveY}px, 0)`;
        }

        if (heroWatermark) {

          heroWatermark.style.transform =
            `translate3d(${-moveX * 0.35}px, ${-moveY * 0.35}px, 0)`;
        }

      }
    );

    hero.addEventListener(
      "pointerleave",
      () => {

        if (heroHeading) {
          heroHeading.style.transform = "";
        }

        if (heroWatermark) {
          heroWatermark.style.transform = "";
        }

      }
    );
  }


  /* =======================================================
     7. MAGNETIC CTA BUTTONS
     ======================================================= */

  const magneticButtons = document.querySelectorAll(
    ".home-button-primary, " +
    ".home-button-secondary"
  );

  if (
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    magneticButtons.forEach((button) => {

      button.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          const strength = 0.08;

          button.style.transform =
            `translate3d(${x * strength}px, ${y * strength}px, 0)`;
        }
      );

      button.addEventListener(
        "pointerleave",
        () => {

          button.style.transform = "";

        }
      );

    });
  }


  /* =======================================================
     8. CTRL + K LIBRARY SEARCH
     ======================================================= */

  const searchButton =
    document.querySelector("#home-search-button");

  /*
   * Try to locate the site's existing search controls.
   * We don't create another search system here.
   */

  const existingSearchInput =
    document.querySelector(
      "#site-search, " +
      ".site-search input, " +
      "#searchInput, " +
      "#search-input"
    );

  const existingSearchToggle =
    document.querySelector(
      "#search-toggle, " +
      ".search-toggle, " +
      ".search-button"
    );


  const openLibrarySearch = () => {

    /*
     * If the existing search interface has a toggle,
     * use it so your current search system stays intact.
     */
    if (existingSearchToggle) {

      existingSearchToggle.click();

      setTimeout(() => {

        const input =
          document.querySelector(
            "#site-search, " +
            ".site-search input, " +
            "#searchInput, " +
            "#search-input"
          );

        if (input) {
          input.focus();
        }

      }, 80);

      return;
    }

    /*
     * Otherwise focus the existing search field.
     */
    if (existingSearchInput) {

      existingSearchInput.focus();

      existingSearchInput.select();

    }
  };


  /*
   * Clicking our homepage search prompt.
   */
  if (searchButton) {

    searchButton.addEventListener(
      "click",
      openLibrarySearch
    );

  }


  /*
   * Global Ctrl + K / Cmd + K.
   */
  document.addEventListener(
    "keydown",
    (event) => {

      const modifier =
        event.ctrlKey ||
        event.metaKey;

      if (
        modifier &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();

        openLibrarySearch();

      }

    }
  );


  /* =======================================================
     9. ESCAPE SEARCH / OVERLAYS
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") return;

      /*
       * Don't interfere with an input if the site already
       * has its own Escape behavior.
       */

      const active =
        document.activeElement;

      if (
        active &&
        (
          active.matches("input") ||
          active.matches("textarea")
        )
      ) {

        active.blur();

      }

    }
  );


  /* =======================================================
     10. ACTIVE SECTION TRACKING
     ======================================================= */

  const sections = document.querySelectorAll(
    ".home-introduction, " +
    ".home-branches, " +
    ".home-library, " +
    ".home-civilizations, " +
    ".home-timeline, " +
    ".home-thinkers, " +
    ".home-beginner, " +
    ".home-final"
  );

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "home-section-active"
            );

          }

        });

      },
      {
        threshold: 0.25
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* =======================================================
     11. SMART IMAGE LOADING
     ======================================================= */

  /*
   * Images lower on the homepage don't need to load
   * immediately.
   */

  const lazyImages =
    document.querySelectorAll(
      ".home-page img[data-src]"
    );

  if ("IntersectionObserver" in window) {

    const imageObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const image =
              entry.target;

            const source =
              image.dataset.src;

            if (source) {
              image.src = source;
            }

            image.removeAttribute(
              "data-src"
            );

            observer.unobserve(image);

          });

        },
        {
          rootMargin: "300px"
        }
      );

    lazyImages.forEach((image) => {
      imageObserver.observe(image);
    });

  }


  /* =======================================================
     12. HOVER TILT FOR FEATURE CARDS
     ======================================================= */

  const tiltCards =
    document.querySelectorAll(
      ".home-thinker-card, " +
      ".home-library-card, " +
      ".home-civilization-card"
    );

  if (
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    tiltCards.forEach((card) => {

      card.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const rotateX =
            ((y / rect.height) - 0.5) * -3;

          const rotateY =
            ((x / rect.width) - 0.5) * 3;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-2px)`;

        }
      );

      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     13. SMOOTH ANCHOR NAVIGATION
     ======================================================= */

  document.addEventListener(
    "click",
    (event) => {

      const link =
        event.target.closest(
          'a[href^="#"]'
        );

      if (!link) return;

      const targetID =
        link.getAttribute("href");

      if (
        !targetID ||
        targetID === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(
          targetID
        );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior:
          prefersReducedMotion
            ? "auto"
            : "smooth",
        block: "start"
      });

      history.replaceState(
        null,
        "",
        targetID
      );

    }
  );


  /* =======================================================
     14. DOCUMENT VISIBILITY
     ======================================================= */

  /*
   * Pause expensive visual effects when the visitor
   * changes browser tabs.
   */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden &&
        heroHeading
      ) {

        heroHeading.style.transform = "";

      }

    }
  );


  /* =======================================================
     15. INITIALIZATION MARKER
     ======================================================= */

  body.classList.add(
    "home-js-ready"
  );

})();

/* =========================================================
   PHILOSOPHY GALLERY
   ========================================================= */

(function () {

  const thinkerCards = document.querySelectorAll(
    ".home-thinker-feature"
  );

  if (!thinkerCards.length) {
    return;
  }


  /* =======================================================
     THINKER DESTINATIONS
     ======================================================= */

  const thinkerLinks = {

    socrates: "socrates.html",

    plato: "plato.html",

    aristotle: "aristotle.html",

    kant: "immanuel-kant.html",

    nietzsche: "nietzsche.html",

   locke: "john-locke.html"
  };


  /* =======================================================
     CLICK + KEYBOARD
     ======================================================= */

  thinkerCards.forEach((card) => {

    const thinker = card.dataset.thinker;

    if (!thinker || !thinkerLinks[thinker]) {
      return;
    }


    card.setAttribute("tabindex", "0");

    card.setAttribute(
      "role",
      "link"
    );


    card.addEventListener("click", () => {

      window.location.href =
        thinkerLinks[thinker];

    });


    card.addEventListener("keydown", (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        window.location.href =
          thinkerLinks[thinker];

      }

    });

  });


  /* =======================================================
     SUBTLE DESKTOP IMAGE MOVEMENT
     ======================================================= */

  const supportsHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (!supportsHover) {
    return;
  }


  thinkerCards.forEach((card) => {

    const image =
      card.querySelector(
        ".home-thinker-image img"
      );

    if (!image) {
      return;
    }


    card.addEventListener("mousemove", (event) => {

      const rect =
        card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left)
        / rect.width;

      const y =
        (event.clientY - rect.top)
        / rect.height;


      const moveX =
        (x - 0.5) * 5;

      const moveY =
        (y - 0.5) * 5;


      image.style.transform =
        `scale(1.07) translate(${moveX}px, ${moveY}px)`;

    });


    card.addEventListener("mouseleave", () => {

      image.style.transform =
        "scale(1.01)";

    });

  });

})();

/* =========================================================
   HOMEPAGE FAQ
   ========================================================= */

(() => {
  const faqItems = document.querySelectorAll(".home-faq-item");

  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {

      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });

    });
  });

})();