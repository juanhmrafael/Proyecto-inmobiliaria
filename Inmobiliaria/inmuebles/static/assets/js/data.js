const listarEstados = async (selectedPais) => {
    try {
        const response = await fetch(`./en-paises/${selectedPais}`);

        const data = await response.json();

        if (data.message === "Success") {

            btnMostrarEstados.querySelector('span').textContent = 'Seleccionar Estado';

            let opciones = ``;

            data.estados.forEach(estado => {
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


const listarMunicipios = async (selectedPais, selectedEstados) => {
    try {
        const response = await fetch(`./en-paises/${selectedPais}/en-estados/${selectedEstados}`);
        const data = await response.json();

        if (data.message === "Success") {

            btnMostrarMunicipios.querySelector('span').textContent = 'Seleccionar Municipio';

            let opciones = ``;

            data.municipios.forEach(municipio => {
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
        const response = await fetch(`./en-paises/`);
        const data = await response.json();

        if (data.message === "Success") {
            let opciones = ``;
            data.paises.forEach(pais => {
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
            .map(checkbox => checkbox.value)

            // Ordenar los valores alfabéticamente
            .sort()

            // Unir los valores en una cadena separada por '_'
            .join('_')

        if (selectedPais) {
            listarEstados(selectedPais);
        }else{

        }

    });

    formEstados.addEventListener("change", (event) => {
        // Obtener los checkboxes seleccionados del formPais
        selectedEstados = Array.from(formEstados.querySelectorAll('input[type="checkbox"]:checked'))

            // Extraer los valores de los checkboxes
            .map(checkbox => checkbox.value)

            // Ordenar los valores alfabéticamente
            .sort()

            // Unir los valores en una cadena separada por '_'
            .join('_')

        if (selectedEstados) {
            listarMunicipios(selectedPais, selectedEstados);
        }
    });
};

window.addEventListener("load", async () => {
    await cargaInicial();
}); 