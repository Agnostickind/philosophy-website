document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     ELEMENTS
     ========================================================= */

  const mainContent = document.querySelector("#main-content");

  const desktopToc = document.querySelector(".article-toc");
  const desktopList = document.querySelector(".article-toc__list");

  const mobileTrigger = document.querySelector(".mobile-toc-trigger");
  const mobileOverlay = document.querySelector(".mobile-toc-overlay");
  const mobileDrawer = document.querySelector("#mobile-toc-drawer");
  const mobileList = document.querySelector(".mobile-toc-drawer__list");
  const mobileClose = document.querySelector(".mobile-toc-drawer__close");

  if (!mainContent) {
    return;
  }


  /* =========================================================
     FIND ARTICLE SECTIONS
     
     Supports:
     - <section id="..."><h2>...</h2></section>
     - <section id="..."><div><h2>...</h2></div></section>
     - sections where the anchor ID is on a heading
     - sections such as Renaissance where the ID is on
       an inner .era-content element
     ========================================================= */

  const sections = Array.from(
    mainContent.querySelectorAll(":scope > section")
  )
    .map((section) => {

      /* -----------------------------------------------
         Find the heading anywhere inside this section
         ----------------------------------------------- */

      const heading = section.querySelector("h2");

      if (!heading) {
        return null;
      }


      /* -----------------------------------------------
         Determine the correct anchor ID
         ----------------------------------------------- */

      let targetId = section.id;


      /* If section has no ID, use the heading ID */

      if (!targetId && heading.id) {
        targetId = heading.id;
      }


      /*
       * Some pages place the ID on an inner element.
       * Example:
       *
       * <section class="era">
       *   <div class="era-content" id="renaissance">
       *     <h2>Renaissance</h2>
       *
       * In that case find the nearest element containing
       * the heading that has an ID.
       */

      if (!targetId) {

        const anchoredElement =
          heading.closest("[id]");

        if (anchoredElement) {
          targetId = anchoredElement.id;
        }
      }


      if (!targetId) {
        return null;
      }


      const text =
        heading.textContent
          .replace(/\s+/g, " ")
          .trim();


      if (!text) {
        return null;
      }


      return {
        section,
        heading,
        targetId,
        text
      };
    })
    .filter(Boolean);


  /* =========================================================
     REMOVE DUPLICATES
     ========================================================= */

  const uniqueSections = [];
  const seenIds = new Set();

  sections.forEach((item) => {

    if (seenIds.has(item.targetId)) {
      return;
    }

    seenIds.add(item.targetId);
    uniqueSections.push(item);
  });


  if (!uniqueSections.length) {
    return;
  }


  /* =========================================================
     HELPERS
     ========================================================= */

  function createLink({
    targetId,
    text,
    mobile = false,
    isTop = false
  }) {

    const link = document.createElement("a");

    link.href = isTop
      ? "#"
      : `#${targetId}`;

    link.textContent = text;

    link.dataset.target =
      targetId || "";


    if (mobile) {

      link.className =
        "mobile-toc-drawer__link";

      if (isTop) {
        link.classList.add(
          "mobile-toc-top"
        );
      }

    } else {

      link.className =
        "article-toc__link";

      if (isTop) {
        link.classList.add(
          "article-toc__top"
        );
      }
    }


    return link;
  }


  /* =========================================================
     DESKTOP TOC
     ========================================================= */

  if (desktopList) {

    desktopList.innerHTML = "";


    /* TOP */

    const desktopTop = createLink({
      text: "↑ TOP",
      mobile: false,
      isTop: true
    });

    desktopList.appendChild(
      desktopTop
    );


    /* SECTIONS */

    uniqueSections.forEach((item) => {

      const link = createLink({
        targetId: item.targetId,
        text: item.text,
        mobile: false
      });

      desktopList.appendChild(link);
    });
  }


  /* =========================================================
     MOBILE TOC
     ========================================================= */

  if (mobileList) {

    mobileList.innerHTML = "";


    /* TOP */

    const mobileTop = createLink({
      text: "↑ TOP",
      mobile: true,
      isTop: true
    });

    mobileList.appendChild(
      mobileTop
    );


    /* SECTIONS */

    uniqueSections.forEach((item) => {

      const link = createLink({
        targetId: item.targetId,
        text: item.text,
        mobile: true
      });

      mobileList.appendChild(link);
    });
  }


  /* =========================================================
     ALL TOC LINKS
     ========================================================= */

  function allTocLinks() {

    return document.querySelectorAll(
      ".article-toc__link[data-target], " +
      ".mobile-toc-drawer__link[data-target]"
    );
  }


  /* =========================================================
     SCROLL TO TOP
     ========================================================= */

  function scrollToTop() {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });


    history.replaceState(
      null,
      "",
      window.location.pathname +
      window.location.search
    );
  }


  /* =========================================================
     SCROLL TO SECTION
     ========================================================= */

  function scrollToSection(target) {

    if (!target) {
      return;
    }


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    history.replaceState(
      null,
      "",
      `${window.location.pathname}` +
      `${window.location.search}` +
      `#${target.id}`
    );
  }


  /* =========================================================
     HANDLE TOC CLICKS
     ========================================================= */

  document.addEventListener(
    "click",
    (event) => {

      const link =
        event.target.closest(
          ".article-toc__link, " +
          ".mobile-toc-drawer__link"
        );


      if (!link) {
        return;
      }


      /* -----------------------------------------------
         TOP
         ----------------------------------------------- */

      if (
        link.classList.contains(
          "article-toc__top"
        ) ||
        link.classList.contains(
          "mobile-toc-top"
        )
      ) {

        event.preventDefault();

        scrollToTop();

        closeMobileToc();

        return;
      }


      /* -----------------------------------------------
         NORMAL SECTION
         ----------------------------------------------- */

      const targetId =
        link.dataset.target;


      if (!targetId) {
        return;
      }


      const target =
        document.getElementById(
          targetId
        );


      if (!target) {
        return;
      }


      event.preventDefault();

      scrollToSection(target);


      /* Close mobile drawer */

      if (
        link.classList.contains(
          "mobile-toc-drawer__link"
        )
      ) {

        closeMobileToc();
      }
    }
  );


  /* =========================================================
     ACTIVE SECTION
     ========================================================= */

  const observer =
    new IntersectionObserver(
      (entries) => {

        const visibleSections =
          entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                a.boundingClientRect.top -
                b.boundingClientRect.top
            );


        if (!visibleSections.length) {
          return;
        }


        const activeId =
          visibleSections[0].target.id;


        /* Remove active state */

        allTocLinks().forEach(
          (link) => {
            link.classList.remove(
              "is-active"
            );
          }
        );


        /* Add active state to both TOCs */

        document
          .querySelectorAll(
            `.article-toc__link[data-target="${CSS.escape(activeId)}"], ` +
            `.mobile-toc-drawer__link[data-target="${CSS.escape(activeId)}"]`
          )
          .forEach((link) => {

            link.classList.add(
              "is-active"
            );


            /* Only scroll the desktop TOC */

            if (
              link.closest(
                ".article-toc__list"
              ) &&
              desktopList
            ) {

              link.scrollIntoView({
                block: "nearest",
                behavior: "smooth"
              });
            }
          });
      },
      {
        root: null,

        rootMargin:
          "-15% 0px -70% 0px",

        threshold: 0
      }
    );


  /* Observe the actual anchor elements */

  uniqueSections.forEach(
    (item) => {

      const target =
        document.getElementById(
          item.targetId
        );


      if (target) {
        observer.observe(target);
      }
    }
  );


  /* =========================================================
     MOBILE TOC OPEN
     ========================================================= */

  function openMobileToc() {

    if (
      !mobileDrawer ||
      !mobileOverlay ||
      !mobileTrigger
    ) {
      return;
    }


    mobileDrawer.classList.add(
      "is-open"
    );

    mobileOverlay.classList.add(
      "is-open"
    );


    /*
     * IMPORTANT:
     * Your overlay has the HTML attribute "hidden".
     * CSS alone cannot override this reliably.
     */

    mobileOverlay.hidden = false;


    mobileDrawer.setAttribute(
      "aria-hidden",
      "false"
    );

    mobileOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

    mobileTrigger.setAttribute(
      "aria-expanded",
      "true"
    );


    document.body.classList.add(
      "mobile-toc-lock"
    );


    if (mobileClose) {

      requestAnimationFrame(
        () => {
          mobileClose.focus();
        }
      );
    }
  }


  /* =========================================================
     MOBILE TOC CLOSE
     ========================================================= */

  function closeMobileToc() {

    if (
      !mobileDrawer ||
      !mobileOverlay ||
      !mobileTrigger
    ) {
      return;
    }


    mobileDrawer.classList.remove(
      "is-open"
    );

    mobileOverlay.classList.remove(
      "is-open"
    );


    mobileDrawer.setAttribute(
      "aria-hidden",
      "true"
    );

    mobileOverlay.setAttribute(
      "aria-hidden",
      "true"
    );


    /*
     * Restore hidden state.
     */

    mobileOverlay.hidden = true;


    mobileTrigger.setAttribute(
      "aria-expanded",
      "false"
    );


    document.body.classList.remove(
      "mobile-toc-lock"
    );
  }


  /* =========================================================
     MOBILE OPEN BUTTON
     ========================================================= */

  if (mobileTrigger) {

    mobileTrigger.addEventListener(
      "click",
      () => {

        const isOpen =
          mobileTrigger.getAttribute(
            "aria-expanded"
          ) === "true";


        if (isOpen) {
          closeMobileToc();
        } else {
          openMobileToc();
        }
      }
    );
  }


  /* =========================================================
     MOBILE CLOSE BUTTON
     ========================================================= */

  if (mobileClose) {

    mobileClose.addEventListener(
      "click",
      closeMobileToc
    );
  }


  /* =========================================================
     OVERLAY CLICK
     ========================================================= */

  if (mobileOverlay) {

    mobileOverlay.addEventListener(
      "click",
      closeMobileToc
    );
  }


  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !== "Escape"
      ) {
        return;
      }


      if (
        mobileTrigger &&
        mobileTrigger.getAttribute(
          "aria-expanded"
        ) === "true"
      ) {

        closeMobileToc();

        mobileTrigger.focus();
      }
    }
  );


  /* =========================================================
     DESKTOP HIDE / SHOW
     ========================================================= */

  const desktopHideButton =
    document.querySelector(
      ".article-toc__hide"
    );


  const articleReadingArea =
    document.querySelector(
      ".article-reading-area"
    );


  if (
    desktopHideButton &&
    desktopToc &&
    articleReadingArea
  ) {

    desktopHideButton.addEventListener(
      "click",
      () => {

        const isHidden =
          desktopToc.classList.toggle(
            "is-hidden"
          );


        articleReadingArea.classList.toggle(
          "toc-hidden",
          isHidden
        );


        desktopHideButton.setAttribute(
          "aria-label",
          isHidden
            ? "Show contents"
            : "Hide contents"
        );


        desktopHideButton.textContent =
          isHidden
            ? "Show"
            : "Hide";
      }
    );
  }

});