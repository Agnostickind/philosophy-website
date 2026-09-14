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
     
     IMPORTANT:
     We use the existing section IDs as the single source
     of truth for BOTH desktop and mobile.
     ========================================================= */

  const sections = Array.from(
    mainContent.querySelectorAll(":scope > section")
  ).filter((section) => {
    const heading = section.querySelector(":scope > h2");

    return (
      section.id &&
      heading &&
      heading.textContent.trim()
    );
  });


  if (!sections.length) {
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

    link.href = isTop ? "#" : `#${targetId}`;

    link.textContent = text;

    link.dataset.target = targetId || "";

    if (mobile) {
      link.className = "mobile-toc-drawer__link";

      if (isTop) {
        link.classList.add("mobile-toc-top");
      }
    } else {
      link.className = "article-toc__link";

      if (isTop) {
        link.classList.add("article-toc__top");
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
      text: "↑ Top",
      mobile: false,
      isTop: true
    });

    desktopList.appendChild(desktopTop);


    /* SECTIONS */

    sections.forEach((section) => {

      const heading = section.querySelector(":scope > h2");

      const link = createLink({
        targetId: section.id,
        text: heading.textContent.trim(),
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
      text: "↑ Top",
      mobile: true,
      isTop: true
    });

    mobileList.appendChild(mobileTop);


    /* SECTIONS */

    sections.forEach((section) => {

      const heading = section.querySelector(":scope > h2");

      const link = createLink({
        targetId: section.id,
        text: heading.textContent.trim(),
        mobile: true
      });

      mobileList.appendChild(link);
    });
  }


  /* =========================================================
     ALL TOC LINKS
     ========================================================= */

  const allTocLinks = () => {
    return document.querySelectorAll(
      ".article-toc__link[data-target], " +
      ".mobile-toc-drawer__link[data-target]"
    );
  };


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
      window.location.pathname + window.location.search
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
      `${window.location.pathname}${window.location.search}#${target.id}`
    );
  }


  /* =========================================================
     HANDLE TOC CLICKS
     ========================================================= */

  document.addEventListener("click", (event) => {

    const link = event.target.closest(
      ".article-toc__link, .mobile-toc-drawer__link"
    );

    if (!link) {
      return;
    }


    /* TOP */

    if (
      link.classList.contains("article-toc__top") ||
      link.classList.contains("mobile-toc-top")
    ) {

      event.preventDefault();

      scrollToTop();

      closeMobileToc();

      return;
    }


    /* NORMAL SECTION */

    const targetId = link.dataset.target;

    if (!targetId) {
      return;
    }

    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    scrollToSection(target);

    /* Close mobile drawer after choosing a section */

    if (
      link.classList.contains(
        "mobile-toc-drawer__link"
      )
    ) {
      closeMobileToc();
    }
  });


  /* =========================================================
     ACTIVE SECTION
     ========================================================= */

  const observer = new IntersectionObserver(
    (entries) => {

      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
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


      /* Remove active state everywhere */

      allTocLinks().forEach((link) => {
        link.classList.remove("is-active");
      });


      /* Add active state to BOTH TOCs */

      document
        .querySelectorAll(
          `.article-toc__link[data-target="${CSS.escape(activeId)}"], ` +
          `.mobile-toc-drawer__link[data-target="${CSS.escape(activeId)}"]`
        )
        .forEach((link) => {

          link.classList.add("is-active");

          /*
           * Only scroll the TOC itself.
           * Never scroll the page here.
           */

          if (
            link.closest(".article-toc__list") &&
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

      /*
       * Section becomes active when it reaches
       * roughly the upper-middle portion of viewport.
       */

      rootMargin: "-15% 0px -70% 0px",

      threshold: 0
    }
  );


  sections.forEach((section) => {
    observer.observe(section);
  });


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

    mobileDrawer.classList.add("is-open");

    mobileOverlay.classList.add("is-open");

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

    /* Move focus to close button */

    if (mobileClose) {
      requestAnimationFrame(() => {
        mobileClose.focus();
      });
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

    mobileDrawer.classList.remove("is-open");

    mobileOverlay.classList.remove("is-open");

    mobileDrawer.setAttribute(
      "aria-hidden",
      "true"
    );

    mobileOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

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

      if (event.key !== "Escape") {
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