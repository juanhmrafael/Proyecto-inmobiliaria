var filtros_activos = {
    'pais': new Set(),
    'estado': new Set(),
    'municipio': new Set(),
    'parroquia': new Set(),
    'ciudad': new Set(),
    'inmuebles': new Set(),
    'habitacion': 0,
    'bano': 0,
    'estacionamiento': 0,
    'precio_minimo': 0,
    'precio_maximo': 0
};

var inmueblesArray = []
/**
 * Easy selector helper function
 */

const select = (selector, all = false) => {
    try {
        return all ? [...document.querySelectorAll(selector)] : document.querySelector(selector);
    } catch (error) {
        return null;
    }
}

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
    const elements = select(el, all);

    if (elements) {
        const addEventListener = e => e.addEventListener(type, listener);

        if (all) {
            elements.forEach(addEventListener);
        } else {
            addEventListener(elements);
        }
    }
}

function obtenerFiltroActivo() {
    const filtros = document.querySelectorAll('#inmuebles-flters li');

    for (const filtro of filtros) {
        if (filtro.classList.contains('filter-active')) {
            return filtro.dataset.filter || null;
        }
    }

    return null; // En caso de que no se encuentre ningún filtro activo
}

function filtrar() {
    inmueblesIsotope.arrange({
        filter: `${obtenerFiltroActivo()}.filter-disponible.filter-paginacion`
    });
}

function inmuebleMostrar(inmueble_id) {
    if (!inmueble_id.classList.contains("filter-disponible")) {
        inmueble_id.classList.add("filter-disponible");
    }
}

function inmuebleOcultar(inmueble_id) {
    if (inmueble_id.classList.contains("filter-disponible")) {
        inmueble_id.classList.remove("filter-disponible");
    }
}

function aplicar_filtro_all() {
    let inmuebles = [...datos_inmuebles];
    inmueblesIsotope.items.forEach(inmueble => {
        pagMostrar(inmueble.element);
    })

    const algunFiltroSeleccionado =
        filtros_activos.pais.size > 0 ||
        filtros_activos.estado.size > 0 ||
        filtros_activos.municipio.size > 0 ||
        filtros_activos.parroquia.size > 0 ||
        filtros_activos.ciudad.size > 0 ||
        filtros_activos.bano > 0 ||
        filtros_activos.habitacion > 0 ||
        filtros_activos.estacionamiento > 0 ||
        filtros_activos.precio_maximo > 0 ||
        filtros_activos.precio_minimo > 0;

    inmuebles.forEach(inmueble => {
        let inmueble_id = document.getElementById(`inmueble-${inmueble.id}`);

        if (!algunFiltroSeleccionado) {
            inmuebleMostrar(inmueble_id);
            return;
        }

        const cumpleFiltros =
            (filtros_activos.pais.size === 0 || filtros_activos.pais.has(inmueble.ubicacion.pais.id)) &&
            (filtros_activos.estado.size === 0 || filtros_activos.estado.has(inmueble.ubicacion.estado.id)) &&
            (filtros_activos.municipio.size === 0 || filtros_activos.municipio.has(inmueble.ubicacion.municipio.id)) &&
            (filtros_activos.parroquia.size === 0 || filtros_activos.parroquia.has(inmueble.ubicacion.parroquia.id)) &&
            (filtros_activos.ciudad.size === 0 || filtros_activos.ciudad.has(inmueble.ubicacion.ciudad.id)) &&
            (filtros_activos.habitacion === 0 || inmueble.habitaciones >= filtros_activos.habitacion) &&
            (filtros_activos.bano === 0 || inmueble.banos >= filtros_activos.bano) &&
            (filtros_activos.estacionamiento === 0 || inmueble.puestos_estacionamiento >= filtros_activos.estacionamiento) &&
            (filtros_activos.precio_minimo === 0 || Number(inmueble.precio.replace(/\./g, '').replace(',', '.')) >= filtros_activos.precio_minimo) &&
            (filtros_activos.precio_maximo === 0 || Number(inmueble.precio.replace(/\./g, '').replace(',', '.')) <= filtros_activos.precio_maximo);

        if (cumpleFiltros) {
            inmuebleMostrar(inmueble_id);
        } else {
            inmuebleOcultar(inmueble_id);
        }
    });
    filtrar();

    inmueblesArray = []
    inmueblesIsotope.filteredItems.forEach(inmuebleDisponible => {
        inmueblesArray.push(inmuebleDisponible.element);
    });
    crearPaginacion();
}


function pagMostrar(inmueble_id) {
    if (!inmueble_id.classList.contains("filter-paginacion")) {
        inmueble_id.classList.add("filter-paginacion");
    }

    if (inmueble_id.classList.contains("d-none")) {
        inmueble_id.classList.remove("d-none");
    }

}

function pagOcultar(inmueble_id) {
    if (inmueble_id.classList.contains("filter-paginacion")) {
        inmueble_id.classList.remove("filter-paginacion");
    }

    if (!inmueble_id.classList.contains("d-none")) {
        inmueble_id.classList.add("d-none");
    }
}

function crearPaginacion() {
    //Probando paginación
    paginationList.innerHTML = '';
    let totalPaginas = Math.ceil(inmueblesArray.length / inmueblesPorPagina);
    if (totalPaginas > 1) {
        for (let i = 1; i <= totalPaginas; i++) {
            let listItem = document.createElement("li");
            listItem.classList.add('btn')
            listItem.textContent = i;
            listItem.addEventListener("click", function (event) {
                mostrarInmueblesPorPagina(event.target.textContent);
                actualizarPaginaActiva(event.target);
            });
            paginationList.appendChild(listItem);
        }
        // Muestra la primera página por defecto
        mostrarInmueblesPorPagina(1);
        // Inicializa la clase activa para la primera página
        actualizarPaginaActiva(paginationList.getElementsByTagName("li")[0]);
    }
}

// Función para mostrar los inmuebles según la página seleccionada
function mostrarInmueblesPorPagina(paginaSeleccionada) {
    let inicio = (paginaSeleccionada - 1) * inmueblesPorPagina;
    let fin = inicio + inmueblesPorPagina;

    let inmueblesPagina = inmueblesArray.slice(inicio, fin);

    inmueblesArray.forEach(inmueble => {
        pagOcultar(inmueble);
    })

    inmueblesPagina.forEach(inmueble => {
        pagMostrar(inmueble);
    })
    filtrar();
}


// Función para actualizar la clase activa
function actualizarPaginaActiva(elementoSeleccionado) {
    var listaItems = paginationList.getElementsByTagName("li");

    for (var i = 0; i < listaItems.length; i++) {
        listaItems[i].classList.remove("active");
    }

    elementoSeleccionado.classList.add("active");

}


const listarPaises = (data, verbo_plural) => {
    try {
        if (data.length > 0) {
            const opciones = data.map(pais => `
                <div class="form-check" id = "item-filtro">
                    <input class="form-check-input" type="checkbox" id="pais-${pais.id}" name="pais"
                        value="${pais.nombre}">
                    <label class="form-check-label" for="pais-${pais.id}">${pais.nombre}</label>
                </div>
            `).join('');

            formPais.innerHTML = `<div class="row" id = "title-filtro"> <strong>${verbo_plural} Disponibles</strong> </div>` + opciones;
        } else {
            formPais.innerHTML = `<strong>No hay inmuebles disponibles</strong>`;
        }
    } catch (error) {
        console.error(`Error en listarPaises -> ${error}`);
    }
};

//Lista cualquier filtro (Estado, Municipio, Parroquia, Ciudad)
const listar = (select_filtro, data, filtro, filtro_verbo_plural, btn, form) => {
    try {
        let items = [];
        let opciones = ``;
        select_filtro.forEach(id => {
            btn.querySelector('span').textContent = `Seleccionar ${filtro}`;
            data[id].forEach(item => {
                if (!items.includes(item.id)) {
                    items.push(item.id);
                    opciones += `
                <div class="form-check" id = "item-filtro">
                    <input class="form-check-input" type="checkbox" id="${filtro}_${id}-${item.id}" name="${filtro}"
                        value="${item.nombre}">
                    <label class="form-check-label" for="${filtro}_${id}-${item.id}">${item.nombre}</label>
                </div>
                `;
                }

            });
            form.innerHTML = `<div class="row" id = "title-filtro"> <strong>${filtro_verbo_plural} Disponibles</strong> </div>` + opciones;
        })
    } catch (error) {
        console.log(`Error en listar(${filtro}) -> ${error}`);
    }
}

function obtenerValor(id) {
    filtros_activos[id] = Number(document.getElementById(id).value.replace(/\./g, '').replace(',', '.'));
    aplicar_filtro_all()
}

const cargaInicial = () => {
    let filtros = datos.filtros.ubicacion;
    listarPaises(filtros.pais, filtros.verbo_plural_pais);

    document.getElementById('habitacionesGroup').addEventListener('change', function (event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'radio' && event.target.name === 'habitacion') {
            filtros_activos.habitacion = Number(event.target.value);
            aplicar_filtro_all()
        }
    });

    document.getElementById('bañosGroup').addEventListener('change', function (event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'radio' && event.target.name === 'baño') {
            filtros_activos.bano = Number(event.target.value);
            aplicar_filtro_all()
        }
    });

    document.getElementById('estacionamientosGroup').addEventListener('change', function (event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'radio' && event.target.name === 'estacionamiento') {
            filtros_activos.estacionamiento = Number(event.target.value);
            aplicar_filtro_all()
        }
    });

    formPais.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formPais
        const selectedPais = new Set([...formPais.querySelectorAll('input[type="checkbox"]:checked')]
            // Extraer los valores de los checkboxes
            .map(checkbox => Number(checkbox.id.split('-')[1])));

        filtros_activos.pais = selectedPais;
        // Al manipular filtro de pais los que dependen de este deben vaciarse
        filtros_activos.estado.clear();
        filtros_activos.municipio.clear();
        filtros_activos.parroquia.clear();
        filtros_activos.ciudad.clear();

        aplicar_filtro_all();

        if (selectedPais.size > 0) {
            //Filtramos los estados de los paises seleccionados en una sola lista y envíamos a la función listarEstados
            listar(selectedPais, filtros.estado, 'estado', filtros.verbo_plural_estado, btnMostrarEstados, formEstados);
        }
    });

    formEstados.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formEstados
        const selectedEstados = new Set(Array.from(formEstados.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => Number(checkbox.id.split('-')[1])));

        filtros_activos.estado = selectedEstados;
        // Al manipular filtro de estado los que dependen de este deben vaciarse
        filtros_activos.municipio.clear();
        filtros_activos.parroquia.clear();
        filtros_activos.ciudad.clear();
        aplicar_filtro_all();

        if (selectedEstados.size > 0) {
            listar(selectedEstados, filtros.municipio, 'municipio', filtros.verbo_plural_municipio, btnMostrarMunicipios, formMunicipios);
        }
    });

    formMunicipios.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formMunicipios
        const selectedMunicipios = new Set(Array.from(formMunicipios.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => Number(checkbox.id.split('-')[1])));

        filtros_activos.municipio = selectedMunicipios;
        // Al manipular filtro de municipio los que dependen de este deben vaciarse
        filtros_activos.parroquia.clear();
        filtros_activos.ciudad.clear();
        aplicar_filtro_all();

        if (selectedMunicipios.size > 0) {
            listar(selectedMunicipios, filtros.parroquia, 'parroquia', filtros.verbo_plural_parroquia, btnMostrarParroquias, formParroquias);
        }
    });

    formParroquias.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formParroquias
        const selectedParroquias = new Set(Array.from(formParroquias.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => Number(checkbox.id.split('-')[1])));

        filtros_activos.parroquia = selectedParroquias;
        // Al manipular filtro de parroquia los que dependen de este deben vaciarse
        filtros_activos.ciudad.clear();
        aplicar_filtro_all();

        if (selectedParroquias.size > 0) {
            listar(selectedParroquias, filtros.ciudad, 'ciudad', filtros.verbo_plural_ciudad, btnMostrarCiudades, formCiudades);
        }
    });


    formCiudades.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formCiudades
        const selectedCiudades = new Set(Array.from(formCiudades.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => Number(checkbox.id.split('-')[1])));

        filtros_activos.ciudad = selectedCiudades;
        aplicar_filtro_all();
    });

};
/**
 * Inmuebles isotope and filter
 */
window.addEventListener('load', () => {
    const inmueblesContainer = select('.inmuebles-container');

    if (inmueblesContainer) {
        const inmueblesFilters = select('#inmuebles-flters li', true);
        inmueblesIsotope = new Isotope(inmueblesContainer, {
            itemSelector: '.inmuebles-item',
            layoutMode: 'fitRows'
        });

        const handleFilterClick = function (e) {
            e.preventDefault();

            const { filter } = this.dataset;//Filtro que se está aplicando (String)

            //Realiza la acción de cambiar el estado activo de un filtro a otro
            inmueblesFilters.forEach(el => el.classList.remove('filter-active'));
            this.classList.add('filter-active');

            inmueblesIsotope.items.forEach(inmueble => {
                pagMostrar(inmueble.element);
            })

            //inmueblesIsotope.items ->Obtengo todos los elementos
            // filter = '.filter-inmueble3'
            inmueblesIsotope.arrange({
                filter: `${filter}.filter-disponible.filter-paginacion`
            });

            //inmueblesIsotope.filteredItems.length -> Obtengo la cantidad de elementos filtrados
            // console.log(inmueblesIsotope.filteredItems)
            //Tiene que estar despues que se filtran los elementos
            inmueblesArray = []
            inmueblesIsotope.filteredItems.forEach(inmuebleDisponible => {
                inmueblesArray.push(inmuebleDisponible.element);
            });
            crearPaginacion();

            inmueblesIsotope.once('arrangeComplete', AOS.refresh);
        };
        on('click', '#inmuebles-flters li', handleFilterClick, true);
    }
    inmueblesArray = []
    inmueblesIsotope.filteredItems.forEach(inmuebleDisponible => {
        inmueblesArray.push(inmuebleDisponible.element);
    });
    crearPaginacion();

    cargaInicial();
    filtrar();

});