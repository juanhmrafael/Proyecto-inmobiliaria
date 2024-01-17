(function () {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Inmuebles isotope and filter
   */
  window.addEventListener('load', () => {
    let inmueblesContainer = select('.inmuebles-container');
    if (inmueblesContainer) {
      let inmueblesIsotope = new Isotope(inmueblesContainer, {
        itemSelector: '.inmuebles-item',
        layoutMode: 'fitRows'
      });

      let inmueblesFilters = select('#inmuebles-flters li', true);

      on('click', '#inmuebles-flters li', function (e) {
        e.preventDefault();
        inmueblesFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        inmueblesIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        inmueblesIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate inmuebles lightbox 
   */
  const inmueblesLightbox = GLightbox({
    selector: '.inmuebles-lightbox'
  });
})();