/* ---------------------------------------------------------
   1. MOBILE MENU + HISTORY SUBMENU
   --------------------------------------------------------- */

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');


if (menuToggle && navLinks) {


    /* -----------------------------------------------------
       CLOSE ALL MOBILE MEGA MENUS
       ----------------------------------------------------- */

    const closeMegaMenus = () => {

        document
            .querySelectorAll('.nav-mega.mobile-open')
            .forEach((mega) => {

                mega.classList.remove('mobile-open');


                const toggle =
                    mega.querySelector('.mega-mobile-toggle');


                if (toggle) {

                    toggle.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                }

            });

    };


    /* -----------------------------------------------------
       CLOSE MAIN MOBILE MENU
       ----------------------------------------------------- */

    const closeMenu = () => {

        navLinks.classList.remove('open');

        menuToggle.classList.remove('open');

        menuToggle.setAttribute(
            'aria-expanded',
            'false'
        );


        /* Also close History submenu */

        closeMegaMenus();

    };


    /* -----------------------------------------------------
       TOGGLE MAIN HAMBURGER MENU
       ----------------------------------------------------- */

    const toggleMenu = () => {

        const isOpen =
            navLinks.classList.toggle('open');


        menuToggle.classList.toggle(
            'open',
            isOpen
        );


        menuToggle.setAttribute(
            'aria-expanded',
            String(isOpen)
        );


        /* When closing the main menu,
           close History too */

        if (!isOpen) {

            closeMegaMenus();

        }

    };


    /* -----------------------------------------------------
       HAMBURGER BUTTON
       ----------------------------------------------------- */

    menuToggle.addEventListener(
        'click',
        toggleMenu
    );


    /* -----------------------------------------------------
       HISTORY MOBILE EXPAND / COLLAPSE
       ----------------------------------------------------- */

    const megaToggles =
        navLinks.querySelectorAll(
            '.mega-mobile-toggle'
        );


    megaToggles.forEach((toggle) => {

        toggle.addEventListener(
            'click',
            (event) => {

                event.preventDefault();


                /* Only activate this behaviour
                   at the mobile navbar breakpoint */

                if (window.innerWidth > 1100) {
                    return;
                }


                const mega =
                    toggle.closest('.nav-mega');


                if (!mega) return;


                const isOpen =
                    mega.classList.contains(
                        'mobile-open'
                    );


                /* Close all other mega menus */

                closeMegaMenus();


                /* Open this one if it was closed */

                if (!isOpen) {

                    mega.classList.add(
                        'mobile-open'
                    );


                    toggle.setAttribute(
                        'aria-expanded',
                        'true'
                    );

                }

            }
        );

    });


    /* -----------------------------------------------------
       CLOSE MOBILE MENU AFTER CLICKING A LINK
       ----------------------------------------------------- */

    navLinks.querySelectorAll('a').forEach((link) => {

        link.addEventListener(
            'click',
            () => {

                if (window.innerWidth <= 1100) {

                    closeMenu();

                }

            }
        );

    });


    /* -----------------------------------------------------
       RESET WHEN RETURNING TO DESKTOP
       ----------------------------------------------------- */

    window.addEventListener(
        'resize',
        () => {

            if (window.innerWidth > 1100) {

                closeMenu();

            }

        }
    );

}