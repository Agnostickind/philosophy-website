/* =========================================================
   SOCRATES REFERENCE PAGE
   Page-scoped JS only.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".sr-page");

  if (!page) return;

  /* ---------------------------------------------
     Desktop / Mobile Section Navigation
     --------------------------------------------- */

  const sidebar = document.querySelector(".sr-sidebar-card");
  const sidebarHeading = document.querySelector(".sr-sidebar-heading");

  const links = [
    ...document.querySelectorAll(".sr-sidebar nav a")
  ];

  const sections = links
    .map((link) => {
      const target = link.getAttribute("href");

      return document.querySelector(target);
    })
    .filter(Boolean);


  /* ---------------------------------------------
     Mobile "On This Page" Toggle
     --------------------------------------------- */

  if (
    sidebarHeading &&
    window.matchMedia("(max-width: 760px)").matches
  ) {
    sidebarHeading.setAttribute("role", "button");
    sidebarHeading.setAttribute("tabindex", "0");
    sidebarHeading.setAttribute("aria-expanded", "false");

    const toggleSidebar = () => {
      const isOpen = sidebar.classList.toggle("is-open");

      sidebarHeading.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    };

    sidebarHeading.addEventListener(
      "click",
      toggleSidebar
    );

    sidebarHeading.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      }
    );
  }


  /* ---------------------------------------------
     Section Link Behavior
     --------------------------------------------- */

  links.forEach((link) => {
    link.addEventListener("click", () => {

      // Close mobile section navigation
      if (
        window.matchMedia("(max-width: 760px)").matches
      ) {
        sidebar?.classList.remove("is-open");

        sidebarHeading?.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    });
  });


  /* ---------------------------------------------
     Active Section Highlighting
     --------------------------------------------- */

  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {
    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          // Remove active state from all links
          links.forEach((link) => {
            link.classList.remove("is-active");
          });

          // Find corresponding navigation link
          const activeLink = links.find(
            (link) =>
              link.getAttribute("href") ===
              `#${entry.target.id}`
          );

          // Add active state
          activeLink?.classList.add("is-active");
        });
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }


  /* ---------------------------------------------
     FAQ Accordion
     Only one FAQ answer stays open at a time.
     --------------------------------------------- */

  const faq = document.querySelector(".sr-faq");

  if (faq) {

    const faqItems =
      faq.querySelectorAll("details");

    faqItems.forEach((detail) => {

      detail.addEventListener(
        "toggle",
        () => {

          // Only act when this item is opened
          if (!detail.open) return;

          // Close all other FAQ items
          faq.querySelectorAll(
            "details[open]"
          ).forEach((other) => {

            if (other !== detail) {
              other.open = false;
            }

          });
        }
      );

    });

  }

});