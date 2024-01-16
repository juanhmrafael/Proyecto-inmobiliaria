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
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>" :
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
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

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

function formatoUnidadesDecimales(idInput) {
  const input = document.getElementById(idInput);
  let valor = input.value.replace(/[^\d,]/g, ''); // Eliminar caracteres no numéricos ni comas

  // Reemplazar comas adicionales y mantener solo una
  const comaIndex = valor.indexOf(',');
  if (comaIndex !== -1) {
    valor = valor.substring(0, comaIndex + 1) + valor.substring(comaIndex + 1).replace(/,/g, '');
  }

  // Formatear como número con separadores de millares
  const partes = valor.split(',');
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Agregar puntos para separar los miles

  // Controlar la cantidad de decimales
  if (partes.length > 1) {
    partes[1] = partes[1].substring(0, 2); // Limitar a dos decimales como máximo
  }

  // Si hay más de dos partes (más de una coma), eliminar la parte adicional
  if (partes.length > 2) {
    partes.length = 2;
  }

  // Unir las partes con una coma como separador decimal
  valor = partes.join(',');

  // Almacenar solo el valor numérico real sin el símbolo de la moneda en el campo de entrada
  input.setAttribute('data-valor', valor.replace(/[^0-9,.]/g, ''));

  // Mostrar el valor formateado con el símbolo de la moneda
  input.value = valor;
}


const cargaListas = async () => {

  function btnTexContent(btn, contenido){
    btn.querySelector('span').textContent = contenido;
  }

  function btnMostrar(btn) {
    esta_oculto = btn.classList.contains("d-none")
    if (esta_oculto) {
      btn.classList.remove("d-none");
    }
  }

  function btnOcultar(btn) {
    esta_oculto = btn.classList.contains("d-none")
    if (!esta_oculto) {
      btn.classList.add("d-none");
    }
  }

  function limpiarChebox(form) {
    //Desmarca todos los checkbox del form pasado como parametro
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }

  function removerBtn(form, btn, contenido) {
    //Desmarca todos los checkbox del form pasado como parametro
    limpiarChebox(form)
    //Ocultamos botón
    btnOcultar(btn)
    //Ponemos el valor por defecto del btn
    btnTexContent(btn, contenido)
  }

  let selectedPais = '';
  let selectedStates = '';
  let selectedMunicipio = '';

  //Pais
  //Animación de flecha 
  btnMostrarpaises.addEventListener('click', function (event) {
    paises.classList.toggle('show');

    const icon = document.querySelector('#btnMostrarpaises > span > i');

    //El método toggle() de la propiedad classList agrega o elimina la clase especificada de la lista de clases del elemento, dependiendo de si la clase ya está presente o no.
    icon.classList.toggle('bx-chevron-down');
    icon.classList.toggle('bx-chevron-up');

    event.stopPropagation(); // Evita que el evento se propague y cierre el formulario inmediatamente después de abrirlo
  });

  document.addEventListener('click', function (event) {
    if (!paises.contains(event.target) && paises.classList.contains('show')) {
      paises.classList.remove('show');

      const icon = document.querySelector('#btnMostrarpaises > span > i');
      icon.classList.remove('bx-chevron-up');
      icon.classList.add('bx-chevron-down');
    }
  });

  formPais.addEventListener('change', function () {//Cuando ocurre un cambio (change) en el formPais hacer ↓
    selectedPais = Array.from(formPais.querySelectorAll('input[type="checkbox"]:checked'))//Obtengo todos los paises seleccionados del formulario
      .map(checkbox => checkbox.value)//Obtengo el value del checkbox
      .sort()//Los ordeno
      .join(', ');//Los separo mediante una ,


    //Comprueba si la variable selectedPais tiene un valor.
    //Si la variable selectedPais tiene un valor, establece el texto del botón en el valor de la variable.
    //Si la variable selectedPais no tiene un valor, establece el texto del botón en la cadena "Seleccionar Pais".
    //↓ ↓
    let contenido = selectedPais || 'Seleccionar Pais';
    console.log(`Pais -> ${contenido}`);

    btnTexContent(btnMostrarpaises, contenido);

    removerBtn(formMunicipios, btnMostrarMunicipios, 'Seleccionar Municipio')
    removerBtn(formEstados, btnMostrarEstados, 'Seleccionar Estado')

    if (selectedPais) {
      btnMostrar(btnMostrarEstados)
    }

  });

  //Estado
  document.getElementById('btnMostrarEstados').addEventListener('click', function (event) {
    const estados = document.getElementById('estados');
    estados.classList.toggle('show');

    const icon = document.querySelector('#btnMostrarEstados > span > i');
    icon.classList.toggle('bx-chevron-down');
    icon.classList.toggle('bx-chevron-up');

    event.stopPropagation(); // Evita que el evento se propague y cierre el formulario inmediatamente después de abrirlo
  });

  document.addEventListener('click', function (event) {
    const estados = document.getElementById('estados');
    if (!estados.contains(event.target) && estados.classList.contains('show')) {
      estados.classList.remove('show');

      const icon = document.querySelector('#btnMostrarEstados > span > i');
      icon.classList.remove('bx-chevron-up');
      icon.classList.add('bx-chevron-down');
    }
  });

  formEstados.addEventListener('change', function () {
    selectedStates = Array.from(formEstados.querySelectorAll('input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.value)
      .sort()
      .join(', ');

    let contenido = selectedStates || 'Seleccionar Estado';
    console.log(`Estado -> ${contenido}`);
    btnTexContent(btnMostrarEstados, contenido);

    removerBtn(formMunicipios, btnMostrarMunicipios, 'Seleccionar Municipio')
    if (selectedStates) {
      btnMostrar(btnMostrarMunicipios);
    }
  });

  //Municipio
  //Animación de flecha 
  btnMostrarMunicipios.addEventListener('click', function (event) {
    municipios.classList.toggle('show');

    const icon = document.querySelector('#btnMostrarMunicipios > span > i');

    //El método toggle() de la propiedad classList agrega o elimina la clase especificada de la lista de clases del elemento, dependiendo de si la clase ya está presente o no.
    icon.classList.toggle('bx-chevron-down');
    icon.classList.toggle('bx-chevron-up');

    event.stopPropagation(); // Evita que el evento se propague y cierre el formulario inmediatamente después de abrirlo
  });

  document.addEventListener('click', function (event) {
    if (!municipios.contains(event.target) && municipios.classList.contains('show')) {
      municipios.classList.remove('show');

      const icon = document.querySelector('#btnMostrarMunicipios > span > i');
      icon.classList.remove('bx-chevron-up');
      icon.classList.add('bx-chevron-down');
    }
  });

  formMunicipios.addEventListener('change', function () {//Cuando ocurre un cambio (change) en el formMunicipios hacer ↓
    selectedMunicipio = Array.from(formMunicipios.querySelectorAll('input[type="checkbox"]:checked'))//Obtengo todos los municipios seleccionados del formulario
      .map(checkbox => checkbox.value)//Obtengo el value del checkbox
      .sort()//Los ordeno
      .join(', ');//Los separo mediante una ,


    //Comprueba si la variable selectedMunicipio tiene un valor.
    //Si la variable selectedMunicipio tiene un valor, establece el texto del botón en el valor de la variable.
    //Si la variable selectedMunicipio no tiene un valor, establece el texto del botón en la cadena "Seleccionar Pais".
    //↓ ↓
    let contenido = selectedMunicipio || 'Seleccionar Municipio';
    console.log(`Municipio -> ${contenido}`);
    btnTexContent(btnMostrarMunicipios, contenido);
  });
}

window.addEventListener("load", async () => {
  await cargaListas();
}); 
