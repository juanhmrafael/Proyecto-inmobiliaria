from django.shortcuts import render, redirect
# Importar modelos
from inmuebles.models import Pais, Estado, Municipio, Parroquia, Ciudad, Inmueble, Direccion
import json
# Para trabajar con vistas en función de clases
from django.views.generic import View
# Para convertir un models in diccionario
from django.forms import model_to_dict


class InmuebleListView(View):
    def get(self, request, error=False, filtro_activo='*', *args, **kwargs):
        permiso = False  # Es el permiso de ver los inmuebles que no estan disponibles para la página
        if request.user.is_authenticated and request.user.groups.filter(name='Admins').exists() or request.user.is_superuser:
            permiso = True

        inmuebles = self.obtenerInmueble(True, permiso=permiso)
        inmuebles_json = self.obtenerInmueble(permiso=permiso)

        filtros = self.obtenerFiltrosInmueble(inmuebles)

        data = {
            'filtros': filtros
        }

        context = {
            'filtros_json': json.dumps(data),
            'filtro_tipo': filtros['tipo'],
            'inmuebles': inmuebles,
            'inmuebles_json': json.dumps(inmuebles_json),
            # La vista por defecto tiene error desactivado pero si desde el post le envia un True indicara que el inmueble no se encontro
            'error': {
                'estado': error,
                'message': "Inmueble no encontrado"
            },
            'filtro_activo': filtro_activo
        }

        return render(request, 'InmuebleList/index.html', context)

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            id = request.POST.get('codigo_inmueble', '')
            # Obtener un objeto de modelo
            try:
                permiso = False
                if request.user.is_authenticated and request.user.groups.filter(name='Admins').exists() or request.user.is_superuser:
                    permiso = True

                inmueble = Inmueble.objects.get(id=id)

                if not permiso and not inmueble.disponibilidad_pagina:  # Valida si tiene o no permiso
                    raise ValueError(
                        "Inmueble no disponible para usuario actual")

                inmueble.precio = self.formatearNumero(inmueble.precio)

                data = {
                    'inmueble': inmueble
                }

                return redirect('inmuebles:detail', id=inmueble.id)
            except Exception as e:
                # Mandamos una notificación de que el inmueble no ha sido encontrado
                return self.get(request, True)

    def obtenerInmueble(self, imagenes=False, permiso=False) -> dict:
        consulta = Inmueble.objects.all()  # Consultamos inmuebles a la bd

        inmuebles = []  # Lista para los inmuebles

        for dato in consulta:
            if permiso or not permiso and dato.disponibilidad_pagina:
                # Obtenemos dirección del inmueble
                direccion = dato.ubicacion_direccion

                ciudad = direccion.ciudad
                parroquia = direccion.parroquia
                municicipio = direccion.municipio
                estado = direccion.estado
                pais = direccion.pais
                # Agente inmobiliario
                agente = model_to_dict(dato.agente, exclude=['foto'])
                if dato.agente.foto:
                    agente.update({'foto': dato.agente.foto.url})

                inmueble = {
                    'id': dato.id,
                    'nombre': dato.nombre,
                    'tipo': dato.tipo.nombre,
                    'estado': dato.estado.nombre,
                    'descripcion': dato.descripcion,
                    'precio': self.formatearNumero(dato.precio),
                    'habitaciones': dato.habitaciones,
                    'banos': dato.banos,
                    'area': self.formatearNumero(dato.area),
                    'ubicacion': {
                        'direccion': direccion.direccion,
                        'maps': direccion.ubicacion_google_maps,
                        'pais': model_to_dict(pais),
                        'estado': model_to_dict(estado),
                        'municipio': model_to_dict(municicipio),
                        'parroquia': model_to_dict(parroquia),
                        'ciudad': model_to_dict(ciudad)
                    },
                    'agente': agente,
                    'puestos_estacionamiento': dato.puestos_estacionamiento,
                    'transaccion': dato.transaccion.nombre
                }
                if imagenes:
                    inmueble['imagenes'] = dato.imagenes
                inmuebles.append(inmueble)

        return inmuebles

    def formatearNumero(self, numero: float) -> str:
        return "{:,.2f}".format(numero).replace(",", " ").replace(".", ",").replace(" ", ".")

    # Se encarga de realizar las relaciones ejemplo estado_pais
    def not_repeat(self, key: int, dictionary: dict, value: dict):
        exist = key in dictionary
        if not exist:  # si no existe se crea una lista con el elemento
            dictionary[key] = [value]
        # si existe y no está registrado en el diccionario[key] Se agrega
        elif not value in dictionary[key]:
            dictionary[key].append(value)

    def obtenerFiltrosInmueble(self, inmuebles: list) -> dict:
        # Filtros a utilizar de inmuebles en bd
        list_pais = []
        estado_pais = {}
        municipio_estado = {}
        parroquia_municipio = {}
        ciudad_parroquia = {}

        tipo = set()

        for inmueble in inmuebles:
            # Obtenemos datos de ubicación
            pais = inmueble['ubicacion']['pais']
            estado = inmueble['ubicacion']['estado']
            municipio = inmueble['ubicacion']['municipio']
            parroquia = inmueble['ubicacion']['parroquia']
            ciudad = inmueble['ubicacion']['ciudad']

            list_pais.append(
                pais
            ) if not pais in list_pais else None

            self.not_repeat(
                key=pais['id'],
                dictionary=estado_pais,
                value=estado
            )

            self.not_repeat(
                key=estado['id'],
                dictionary=municipio_estado,
                value=municipio
            )

            self.not_repeat(
                key=municipio['id'],
                dictionary=parroquia_municipio,
                value=parroquia
            )

            self.not_repeat(
                key=parroquia['id'],
                dictionary=ciudad_parroquia,
                value=ciudad
            )
            tipo.add(inmueble['tipo'])

        # print('estados')
        # for key in estado_pais:
        #     print(f'{key}: {estado_pais[key]}')

        # print('municipios')
        # for key in municipio_estado:
        #     print(f'{key}: {municipio_estado[key]}')

        # print('parroquias')
        # for key in parroquia_municipio:
        #     print(f'{key}: {parroquia_municipio[key]}')

        # print('ciudades')
        # for key in ciudad_parroquia:
        #     print(f'{key}: {ciudad_parroquia[key]}')

        filtros = {
            'ubicacion': {
                'verbo_plural_pais': "Paises",
                'verbo_plural_estado': "Estados",
                'verbo_plural_municipio': "Municipios",
                'verbo_plural_parroquia': "Parroquias",
                'verbo_plural_ciudad': "Ciudades",

                'pais': list_pais,
                'estado': estado_pais,
                'municipio': municipio_estado,
                'parroquia': parroquia_municipio,
                'ciudad': ciudad_parroquia
            },
            'tipo': sorted(tipo)
        }

        return filtros


class InmuebleDetailView(View):
    def get(self, request, id, *args, **kwargs):
        try:
            # Obtener un objeto de modelo
            permiso = False
            if request.user.is_authenticated and request.user.groups.filter(name='Admins').exists() or request.user.is_superuser:
                permiso = True

            inmueble = Inmueble.objects.get(id=id)

            if not permiso and not inmueble.disponibilidad_pagina:  # Valida si tiene o no permiso
                raise ValueError(
                    "Inmueble no disponible para usuario actual")

            inmueble.precio = self.formatearNumero(inmueble.precio)

            data = {
                'inmueble': inmueble
            }

            return render(request, 'InmuebleDetail/index.html', {'data': data})
        except Exception as e:
            return redirect('inmuebles:home')

    def formatearNumero(self, numero: float) -> str:
        return "{:,.2f}".format(numero).replace(",", " ").replace(".", ",").replace(" ", ".")
