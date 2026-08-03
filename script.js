/* =========================================================
   LIBRARY OF PHILOSOPHY — shared site behavior
   Loaded on every page. Handles:
   1. Mobile hamburger menu (open/close, closes on link click
      or on resize back to desktop width)
   2. Active nav-link highlighting for the current page
   3. A "back to top" button that appears after scrolling
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. MOBILE MENU
     --------------------------------------------------------- */

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {

    const closeMenu = () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close the menu after tapping any link in it
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close the menu automatically if the window is resized
    // back up to desktop width while it's open
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    });
  }

  /* ---------------------------------------------------------
     2. ACTIVE NAV LINK
     Highlights whichever nav/footer link matches the
     current page, so visitors can see where they are.
     --------------------------------------------------------- */

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .footer-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---------------------------------------------------------
     3. BACK TO TOP BUTTON
     Created once here rather than pasted into every HTML
     file, so it stays in sync automatically across pages.
     --------------------------------------------------------- */

  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '&uarr;';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------
     4. CONTACT FORM
     Only runs on contact.html (checks the form exists first).
     Validates required fields + email format, shows inline
     errors, then submits to Formspree via fetch() — this keeps
     visitors on the styled page instead of redirecting them to
     Formspree's default confirmation page.
     --------------------------------------------------------- */

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const submitBtn = contactForm.querySelector('.form-submit');
    const successMessage = contactForm.querySelector('.form-success');

    const showError = (group, message) => {
      group.classList.add('invalid');
      group.querySelector('.form-error').textContent = message;
    };

    const clearError = (group) => {
      group.classList.remove('invalid');
      group.querySelector('.form-error').textContent = '';
    };

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let isValid = true;
      successMessage.classList.remove('visible', 'error');

      contactForm.querySelectorAll('.form-group').forEach((group) => {
        const field = group.querySelector('input, textarea');
        clearError(group);

        if (!field.value.trim()) {
          showError(group, 'This field is required.');
          isValid = false;
        } else if (field.type === 'email' && !emailPattern.test(field.value.trim())) {
          showError(group, 'Please enter a valid email address.');
          isValid = false;
        }
      }); 
       
      

      if (!isValid) {
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      })
        .then((response) => {
          if (response.ok) {
            successMessage.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
            successMessage.classList.add('visible');
            contactForm.reset();
          } else {
            return response.json().then((data) => {
              const errorText = data && data.errors
                ? data.errors.map((e) => e.message).join(', ')
                : 'Something went wrong — please try again or email directly.';
              successMessage.textContent = errorText;
              successMessage.classList.add('visible', 'error');
            });
          }
        })
        .catch(() => {
          successMessage.textContent = 'Network error — please check your connection and try again.';
          successMessage.classList.add('visible', 'error');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }

});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".category-nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    // Remove active highlight after leaving the last navigation section
    const lastSection = sections[sections.length - 1];

    if (lastSection) {

        const lastSectionBottom =
            lastSection.offsetTop + lastSection.offsetHeight;

        if (window.scrollY > lastSectionBottom - 180) {
            current = "";
        }

    }

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});