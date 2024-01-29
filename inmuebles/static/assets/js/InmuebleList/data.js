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
        filter: `${obtenerFiltroActivo()}.filter-disponible`
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
    inmueblesArray = []

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
            (filtros_activos.pais.size === 0 || filtros_activos.pais.has(String(inmueble.ubicacion.pais.id))) &&
            (filtros_activos.estado.size === 0 || filtros_activos.estado.has(String(inmueble.ubicacion.estado.id))) &&
            (filtros_activos.municipio.size === 0 || filtros_activos.municipio.has(String(inmueble.ubicacion.municipio.id))) &&
            (filtros_activos.parroquia.size === 0 || filtros_activos.parroquia.has(String(inmueble.ubicacion.parroquia.id))) &&
            (filtros_activos.ciudad.size === 0 || filtros_activos.ciudad.has(String(inmueble.ubicacion.ciudad.id))) &&
            (filtros_activos.habitacion === 0 || inmueble.habitaciones >= filtros_activos.habitacion) &&
            (filtros_activos.bano === 0 || inmueble.banos >= filtros_activos.bano) &&
            (filtros_activos.estacionamiento === 0 || inmueble.puestos_estacionamiento >= filtros_activos.estacionamiento) &&
            (filtros_activos.precio_minimo === 0 || Number(inmueble.precio.replace(/\./g, '').replace(',', '.')) >= filtros_activos.precio_minimo) &&
            (filtros_activos.precio_maximo === 0 || Number(inmueble.precio.replace(/\./g, '').replace(',', '.')) <= filtros_activos.precio_maximo);

        if (cumpleFiltros) {
            inmuebleMostrar(inmueble_id);
            inmueblesArray.push(inmueble_id)
        } else {
            inmuebleOcultar(inmueble_id);
        }
    });
    filtrar();
    console.log(inmueblesIsotope.filteredItems)

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
        inmuebleOcultar(inmueble)
    })

    inmueblesPagina.forEach(inmueble => {
        inmuebleMostrar(inmueble)
    })
}


// Función para actualizar la clase activa
function actualizarPaginaActiva(elementoSeleccionado) {
    var listaItems = paginationList.getElementsByTagName("li");

    for (var i = 0; i < listaItems.length; i++) {
        listaItems[i].classList.remove("active");
    }

    elementoSeleccionado.classList.add("active");
}


const listarPaises = (data) => {
    try {
        if (data.length > 0) {
            const opciones = data.map(pais => `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="pais-${pais.id}" name="pais"
                        value="${pais.nombre}">
                    <label class="form-check-label" for="pais-${pais.id}">${pais.nombre}</label>
                </div>
            `).join('');

            formPais.innerHTML = opciones;
        } else {
            formPais.innerHTML = `<strong>No hay países disponibles</strong>`;
        }
    } catch (error) {
        console.error(`Error en listarPaises -> ${error}`);
    }
};


const listarEstados = (data) => {
    try {
        if (data.length > 0) {

            btnMostrarEstados.querySelector('span').textContent = 'Seleccionar Estado';

            let opciones = ``;

            data.forEach(estado => {
                opciones += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="estado-${estado.id}" name="estado"
                        value="${estado.nombre}">
                    <label class="form-check-label" for="estado-${estado.id}">${estado.nombre}</label>
                </div>
                `;
            });
            formEstados.innerHTML = opciones;
        } else {
            formEstados.innerHTML = `<strong>No hay estados disponibles</strong>`;
        }

    } catch (error) {
        console.log(`Error en listarEstados -> ${error}`);
    }
}

const listarMunicipios = (data) => {
    try {
        if (data.length > 0) {

            btnMostrarMunicipios.querySelector('span').textContent = 'Seleccionar Municipio';

            let opciones = ``;

            data.forEach(municipio => {
                opciones += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="municipio-${municipio.id}" name="municipio"
                        value="${municipio.nombre}">
                    <label class="form-check-label" for="municipio-${municipio.id}">${municipio.nombre}</label>
                </div>
                `;
            });
            formMunicipios.innerHTML = opciones;
        } else {
            formMunicipios.innerHTML = `<strong>No hay municipios disponibles</strong>`;
        }

    } catch (error) {
        console.log(`Error en listarMunicipios -> ${error}`);
    }
}

const listarParroquias = (data) => {
    try {
        if (data.length > 0) {

            btnMostrarParroquias.querySelector('span').textContent = 'Seleccionar Parroquia';

            let opciones = ``;

            data.forEach(parroquia => {
                opciones += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="parroquia-${parroquia.id}" name="parroquia"
                        value="${parroquia.nombre}">
                    <label class="form-check-label" for="parroquia-${parroquia.id}">${parroquia.nombre}</label>
                </div>
                `;
            });
            formParroquias.innerHTML = opciones;
        } else {
            formParroquias.innerHTML = `<strong>No hay parroquias disponibles</strong>`;
        }

    } catch (error) {
        console.log(`Error en listarParroquias -> ${error}`);
    }
}

const listarCiudades = (data) => {
    try {
        if (data.length > 0) {

            btnMostrarCiudades.querySelector('span').textContent = 'Seleccionar Ciudad';

            let opciones = ``;

            data.forEach(ciudad => {
                opciones += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="ciudad-${ciudad.id}" name="ciudad"
                        value="${ciudad.nombre}">
                    <label class="form-check-label" for="ciudad-${ciudad.id}">${ciudad.nombre}</label>
                </div>
                `;
            });
            formCiudades.innerHTML = opciones;
        } else {
            formCiudades.innerHTML = `<strong>No hay ciudades disponibles</strong>`;
        }

    } catch (error) {
        console.log(`Error en listarCiudades -> ${error}`);
    }
}

function obtenerValor(id) {
    filtros_activos[id] = Number(document.getElementById(id).value.replace(/\./g, '').replace(',', '.'));
    aplicar_filtro_all()
}

const cargaInicial = () => {
    let filtros = datos.filtros;
    listarPaises(filtros.ubicacion.pais);

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
            .map(checkbox => checkbox.id.split('-')[1]));

        filtros_activos.pais = selectedPais;
        // Al manipular filtro de pais los que dependen de este deben vaciarse
        filtros_activos.estado.clear();
        filtros_activos.municipio.clear();
        filtros_activos.parroquia.clear();
        filtros_activos.ciudad.clear();

        aplicar_filtro_all();
        console.log(selectedPais)
        if (selectedPais.size > 0) {
            const data = filtros.ubicacion.estado.filter(estado => selectedPais.has(String(estado.pais)));
            console.log(data)
            listarEstados(data);
        }
    });

    formEstados.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formEstados
        const selectedEstados = new Set(Array.from(formEstados.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.id.split('-')[1]));

        filtros_activos.estado = selectedEstados;
        // Al manipular filtro de estado los que dependen de este deben vaciarse
        filtros_activos.municipio.clear();
        filtros_activos.parroquia.clear();
        filtros_activos.ciudad.clear();
        aplicar_filtro_all();

        if (selectedEstados.size > 0) {
            const data = filtros.ubicacion.municipio.filter(municipio => selectedEstados.has(String(municipio.estado)));
            listarMunicipios(data);
        }
    });

    formMunicipios.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formMunicipios
        const selectedMunicipios = new Set(Array.from(formMunicipios.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.id.split('-')[1]));

        filtros_activos.municipio = selectedMunicipios;
        // Al manipular filtro de municipio los que dependen de este deben vaciarse
        filtros_activos.parroquia.clear();
        filtros_activos.ciudad.clear();
        aplicar_filtro_all();

        if (selectedMunicipios.size > 0) {
            const data = filtros.ubicacion.parroquia.filter(parroquia => selectedMunicipios.has(String(parroquia.municipio)));
            listarParroquias(data);
        }
    });

    formParroquias.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formParroquias
        const selectedParroquias = new Set(Array.from(formParroquias.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.id.split('-')[1]));

        filtros_activos.parroquia = selectedParroquias;
        // Al manipular filtro de parroquia los que dependen de este deben vaciarse
        filtros_activos.ciudad.clear();
        aplicar_filtro_all();

        if (selectedParroquias.size > 0) {
            const data = filtros.ubicacion.ciudad.filter(ciudad => selectedParroquias.has(String(ciudad.parroquia)));
            listarCiudades(data);
        }
    });


    formCiudades.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formCiudades
        const selectedCiudades = new Set(Array.from(formCiudades.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.id.split('-')[1]));

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
            
            //inmueblesIsotope.items ->Obtengo todos los elementos
            // filter = '.filter-inmueble3'
            inmueblesIsotope.arrange({
                filter: `${filter}.filter-disponible`
            });

            //inmueblesIsotope.filteredItems.length -> Obtengo la cantidad de elementos filtrados
            console.log(inmueblesIsotope.filteredItems)
            //Tiene que estar despues que se filtran los elementos
            inmueblesIsotope.once('arrangeComplete', AOS.refresh);
        };

        on('click', '#inmuebles-flters li', handleFilterClick, true);

    }
    cargaInicial();
    filtrar();
});