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

function btnTexContent(btn, contenido) {
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
let selectedEstado = '';
let selectedMunicipio = '';
let selectedParroquia = '';
let selectedCiudad = '';

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
  let contenido = selectedPais || 'Seleccionar pais';
  //console.log(`Pais -> ${contenido}`);

  btnTexContent(btnMostrarpaises, contenido);

  removerBtn(formEstados, btnMostrarEstados, `Seleccionar estado`)
  removerBtn(formMunicipios, btnMostrarMunicipios, 'Seleccionar municipio')
  removerBtn(formParroquias, btnMostrarParroquias, 'Seleccionar parroquia')
  removerBtn(formCiudades, btnMostrarCiudades, 'Seleccionar ciudad');

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
  selectedEstado = Array.from(formEstados.querySelectorAll('input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.value)
    .sort()
    .join(', ');

  let contenido = selectedEstado || 'Seleccionar estado';
  //console.log(`Estado -> ${contenido}`);
  btnTexContent(btnMostrarEstados, contenido);

  removerBtn(formMunicipios, btnMostrarMunicipios, 'Seleccionar municipio')
  removerBtn(formParroquias, btnMostrarParroquias, 'Seleccionar parroquia')
  removerBtn(formCiudades, btnMostrarCiudades, 'Seleccionar ciudad');

  if (selectedEstado) {
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
  let contenido = selectedMunicipio || 'Seleccionar municipio';
  //console.log(`Municipio -> ${contenido}`);
  btnTexContent(btnMostrarMunicipios, contenido);

  removerBtn(formParroquias, btnMostrarParroquias, 'Seleccionar parroquia');
  removerBtn(formCiudades, btnMostrarCiudades, 'Seleccionar ciudad');

  if (selectedMunicipio) {
    btnMostrar(btnMostrarParroquias);
  }
});

//Parroquias
//Animación de flecha 
btnMostrarParroquias.addEventListener('click', function (event) {
  parroquias.classList.toggle('show');

  const icon = document.querySelector('#btnMostrarParroquias > span > i');

  //El método toggle() de la propiedad classList agrega o elimina la clase especificada de la lista de clases del elemento, dependiendo de si la clase ya está presente o no.
  icon.classList.toggle('bx-chevron-down');
  icon.classList.toggle('bx-chevron-up');

  event.stopPropagation(); // Evita que el evento se propague y cierre el formulario inmediatamente después de abrirlo
});

document.addEventListener('click', function (event) {
  if (!parroquias.contains(event.target) && parroquias.classList.contains('show')) {
    parroquias.classList.remove('show');

    const icon = document.querySelector('#btnMostrarParroquias > span > i');
    icon.classList.remove('bx-chevron-up');
    icon.classList.add('bx-chevron-down');
  }
});

formParroquias.addEventListener('change', function () {//Cuando ocurre un cambio (change) en el formParroquias hacer ↓
  selectedParroquia = Array.from(formParroquias.querySelectorAll('input[type="checkbox"]:checked'))//Obtengo todos los parroquias seleccionados del formulario
    .map(checkbox => checkbox.value)//Obtengo el value del checkbox
    .sort()//Los ordeno
    .join(', ');//Los separo mediante una ,


  //Comprueba si la variable selectedParroquia tiene un valor.
  //Si la variable selectedParroquia tiene un valor, establece el texto del botón en el valor de la variable.
  //Si la variable selectedParroquia no tiene un valor, establece el texto del botón en la cadena "Seleccionar Pais".
  //↓ ↓
  let contenido = selectedParroquia || 'Seleccionar parroquia';
  //console.log(`Parroquia -> ${contenido}`);
  btnTexContent(btnMostrarParroquias, contenido);

  removerBtn(formCiudades, btnMostrarCiudades, 'Seleccionar ciudad');

  if (selectedParroquia) {
    btnMostrar(btnMostrarCiudades);
  }
});

//Ciudad
//Animación de flecha 
btnMostrarCiudades.addEventListener('click', function (event) {
  ciudades.classList.toggle('show');

  const icon = document.querySelector('#btnMostrarCiudades > span > i');

  //El método toggle() de la propiedad classList agrega o elimina la clase especificada de la lista de clases del elemento, dependiendo de si la clase ya está presente o no.
  icon.classList.toggle('bx-chevron-down');
  icon.classList.toggle('bx-chevron-up');

  event.stopPropagation(); // Evita que el evento se propague y cierre el formulario inmediatamente después de abrirlo
});

document.addEventListener('click', function (event) {
  if (!ciudades.contains(event.target) && ciudades.classList.contains('show')) {
    ciudades.classList.remove('show');

    const icon = document.querySelector('#btnMostrarCiudades > span > i');
    icon.classList.remove('bx-chevron-up');
    icon.classList.add('bx-chevron-down');
  }
});

formCiudades.addEventListener('change', function () {//Cuando ocurre un cambio (change) en el formCiudades hacer ↓
  selectedCiudad = Array.from(formCiudades.querySelectorAll('input[type="checkbox"]:checked'))//Obtengo todos los ciudades seleccionados del formulario
    .map(checkbox => checkbox.value)//Obtengo el value del checkbox
    .sort()//Los ordeno
    .join(', ');//Los separo mediante una ,


  //Comprueba si la variable selectedCiudad tiene un valor.
  //Si la variable selectedCiudad tiene un valor, establece el texto del botón en el valor de la variable.
  //Si la variable selectedCiudad no tiene un valor, establece el texto del botón en la cadena "Seleccionar Pais".
  //↓ ↓
  let contenido = selectedCiudad || 'Seleccionar ciudad';
  //console.log(`Ciudad -> ${contenido}`);
  btnTexContent(btnMostrarCiudades, contenido);
});