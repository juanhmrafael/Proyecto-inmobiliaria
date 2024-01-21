const listarPaises = async (data) => {
    try {
        if (data.length > 0) {
            let opciones = ``;
            data.forEach(pais => {
                opciones += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="pais-${pais.id}" name="pais"
                        value="${pais.nombre}">
                    <label class="form-check-label" for="pais-${pais.id}">${pais.nombre}</label>
                </div>
                `;
            });
            formPais.innerHTML = opciones;

        } else {
            formPais.innerHTML = `<strong>No hay paises disponibles</strong>`;
        }

    } catch (error) {
        console.log(`Error en listarPaises -> ${error}`);
    }
};

const listarEstados = async (data) => {
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

const listarMunicipios = async (data) => {
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

const listarParroquias = async (data) => {
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

const listarCiudades = async (data) => {
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

const cargaInicial = async () => {
    let filtros = datos.filtros;
    await listarPaises(filtros.ubicacion.pais);
    let selectedPais = '';
    let selectedEstados = '';

    formPais.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formPais
        selectedPais = Array.from(formPais.querySelectorAll('input[type="checkbox"]:checked'))

            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.id.split('-')[1])



        if (selectedPais) {
            let data = []
            let info = filtros.ubicacion.estado;

            selectedPais.forEach(selectedID => {

                info.forEach(estado => {
                    if (estado.pais == selectedID) {
                        data.push(estado)
                    }
                });
            });

            listarEstados(data);
        }
    });

    formEstados.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formPais
        selectedEstados = Array.from(formEstados.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.id.split('-')[1])


        if (selectedEstados) {
            let data = []
            let info = filtros.ubicacion.municipio;

            selectedEstados.forEach(selectedID => {

                info.forEach(municipio => {
                    if (municipio.estado == selectedID) {
                        data.push(municipio)
                    }
                });
            });
            listarMunicipios(data);
        }
    });

    formMunicipios.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formPais
        selectedMunicipios = Array.from(formMunicipios.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.id.split('-')[1])


        if (selectedMunicipios) {
            let data = []
            let info = filtros.ubicacion.parroquia;

            selectedMunicipios.forEach(selectedID => {

                info.forEach(parroquia => {
                    if (parroquia.municipio == selectedID) {
                        data.push(parroquia)
                    }
                });
            });
            listarParroquias(data);
        }
    });

    formParroquias.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formPais
        selectedParroquias = Array.from(formParroquias.querySelectorAll('input[type="checkbox"]:checked'))
            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.id.split('-')[1])


        if (selectedParroquias) {
            let data = []
            let info = filtros.ubicacion.ciudad;

            selectedParroquias.forEach(selectedID => {

                info.forEach(ciudad => {
                    if (ciudad.parroquia == selectedID) {
                        data.push(ciudad)
                    }
                });
            });
            listarCiudades(data);
        }
    });
};

window.addEventListener("load", async () => {
    await cargaInicial();
}); 