/* =========================================================
   HISTORY MOBILE SUBMENU
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const historyMega =
        document.querySelector('.history-mega');

    const historyToggle =
        document.querySelector('.mega-mobile-toggle');


    if (!historyMega || !historyToggle) {
        return;
    }


    historyToggle.addEventListener('click', (event) => {

        event.preventDefault();

        /* Only for mobile and tablet */

        if (window.innerWidth > 1100) {
            return;
        }


        const isOpen =
            historyMega.classList.toggle('mobile-open');


        historyToggle.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

    });

});