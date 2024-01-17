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

const listarPaises = async () => {
    try {
        const data = datos.ubicacion_filtro.paises;

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

const cargaInicial = async () => {
    await listarPaises();
    let selectedPais = '';
    let selectedEstados = '';

    formPais.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formPais
        selectedPais = Array.from(formPais.querySelectorAll('input[type="checkbox"]:checked'))

            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.id.split('-')[1])
            
            

        if (selectedPais) {
            let data = []
            let info = datos.ubicacion_filtro.estados;

            selectedPais.forEach(selectedID => {
                
                info.forEach(estado => {
                    if(estado.pais_id == selectedID){
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
            let info = datos.ubicacion_filtro.municipios;

            selectedEstados.forEach(selectedID => {
                
                info.forEach(municipio => {
                    if(municipio.estado_id == selectedID){
                        data.push(municipio)
                    }
                });
            });
            listarMunicipios(data);
        }
    });
};

window.addEventListener("load", async () => {
    await cargaInicial();
}); 