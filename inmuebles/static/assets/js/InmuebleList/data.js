var filtros_activos = {
    'pais': new Set(),
    'estado': new Set(),
    'municipio': new Set(),
    'parroquia': new Set(),
    'ciudad': new Set(),
    'inmuebles': new Set()
};

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



function click(seleccion = "*") {
    select(`#inmuebles-flters li[data-filter="${seleccion}"]`).click();
}

function inmuebleMostrar(inmueble_id) {
    if (inmueble_id.classList.contains("d-none")) {
        inmueble_id.classList.remove("d-none");
        click();
    }
}

function inmuebleOcultar(inmueble_id) {
    if (!inmueble_id.classList.contains("d-none")) {
        inmueble_id.classList.add("d-none");
        click();
    }
}

function aplicar_filtro_all() {
    let inmuebles = [...datos_inmuebles];

    const algunFiltroSeleccionado =
        filtros_activos.pais.size > 0 ||
        filtros_activos.estado.size > 0 ||
        filtros_activos.municipio.size > 0 ||
        filtros_activos.parroquia.size > 0 ||
        filtros_activos.ciudad.size > 0;

    inmuebles.forEach(inmueble => {
        let inmueble_id = document.getElementById(`inmueble-${inmueble.id}`);

        if (!algunFiltroSeleccionado) {
            inmuebleMostrar(inmueble_id);
            return;
        }

        const cumpleFiltros =
            filtros_activos.pais.has(String(inmueble.ubicacion.pais.id)) &&
            (filtros_activos.estado.size === 0 || filtros_activos.estado.has(String(inmueble.ubicacion.estado.id))) &&
            (filtros_activos.municipio.size === 0 || filtros_activos.municipio.has(String(inmueble.ubicacion.municipio.id))) &&
            (filtros_activos.parroquia.size === 0 || filtros_activos.parroquia.has(String(inmueble.ubicacion.parroquia.id))) &&
            (filtros_activos.ciudad.size === 0 || filtros_activos.ciudad.has(String(inmueble.ubicacion.ciudad.id)));

        if (cumpleFiltros) {
            inmuebleMostrar(inmueble_id);
        } else {
            inmuebleOcultar(inmueble_id);
        }
    });
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



const cargaInicial = () => {
    let filtros = datos.filtros;
    listarPaises(filtros.ubicacion.pais);

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
        const inmueblesIsotope = new Isotope(inmueblesContainer, {
            itemSelector: '.inmuebles-item',
            layoutMode: 'fitRows'
        });

        const handleFilterClick = function (e) {
            e.preventDefault();

            const { filter } = this.dataset;

            inmueblesFilters.forEach(el => el.classList.remove('filter-active'));
            this.classList.add('filter-active');

            inmueblesIsotope.arrange({
                filter
            });

            inmueblesIsotope.once('arrangeComplete', AOS.refresh);
        };

        on('click', '#inmuebles-flters li', handleFilterClick, true);
        
    }
    cargaInicial();
});