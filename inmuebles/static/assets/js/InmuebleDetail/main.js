(function() {
    "use strict";

    /**
     * inmuebles details slider
     */
    new Swiper('.inmuebles-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });

  })();