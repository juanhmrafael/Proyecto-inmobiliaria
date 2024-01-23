from django.shortcuts import render
# Importar modelos
from inmuebles.models import Pais, Estado, Municipio, Parroquia, Ciudad, Inmueble, Direccion
import json
# Para trabajar con vistas en función de clases
from django.views.generic import View
# Para convertir un models in diccionario
from django.forms import model_to_dict


class InmuebleListView(View):
    def get(self, request, *args, **kwargs):
        inmuebles = self.obtenerInmueble()
        filtros = self.obtenerFiltrosInmueble(inmuebles)

        data = {
            'filtros': filtros
        }

        context = {
            'filtros_json': json.dumps(data),
            'filtro_tipo': filtros['tipo'],
            'inmuebles': inmuebles,
            'inmuebles_json': json.dumps(inmuebles)
        }

        return render(request, 'InmuebleList/index.html', context)

    def obtenerInmueble(self) -> dict:
        consulta = Inmueble.objects.all()  # Consultamos inmuebles a la bd

        inmuebles = []  # Lista para los inmuebles

        for dato in consulta:
            # Obtenemos dirección del inmueble
            direccion = dato.ubicacion_direccion
            ciudad = direccion.ciudad
            parroquia = ciudad.parroquia
            municicipio = parroquia.municipio
            estado = municicipio.estado
            pais = estado.pais
            # Agente inmobiliario
            agente = model_to_dict(dato.agente, exclude=['foto'])
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
                    'direccion': direccion.descripcion,
                    'maps': direccion.ubicacion_google_maps,
                    'pais': model_to_dict(pais),
                    'estado': model_to_dict(estado),
                    'municipio': model_to_dict(municicipio),
                    'parroquia': model_to_dict(parroquia),
                    'ciudad': model_to_dict(ciudad)
                },
                'agente': agente,
                'puestos_estacionamiento': dato.puestos_estacionamiento,
                'transaccion': dato.transaccion.nombre,
            }
            inmuebles.append(inmueble)

        return inmuebles

    def formatearNumero(self, numero: float) -> str:
        return "{:,.2f}".format(numero).replace(",", " ").replace(".", ",").replace(" ", ".")
    
    def obtenerFiltrosInmueble(self, inmuebles: list) -> dict:
        # Filtros a utilizar de inmuebles en bd
        pais = []
        estado = []
        municipio = []
        parroquia = []
        ciudad = []
        tipo = []

        for inmueble in inmuebles:

            pais.append(inmueble['ubicacion']['pais']
                        ) if not inmueble['ubicacion']['pais'] in pais else None

            estado.append(inmueble['ubicacion']['estado']
                          ) if not inmueble['ubicacion']['estado'] in estado else None

            municipio.append(inmueble['ubicacion']['municipio']
                             ) if not inmueble['ubicacion']['municipio'] in municipio else None

            parroquia.append(inmueble['ubicacion']['parroquia']
                             ) if not inmueble['ubicacion']['parroquia'] in parroquia else None

            ciudad.append(inmueble['ubicacion']['ciudad']
                          ) if not inmueble['ubicacion']['ciudad'] in ciudad else None

            tipo.append(inmueble['tipo']
                        ) if not inmueble['tipo'] in tipo else None

        filtros = {
            'ubicacion': {
                'pais': pais,
                'estado': estado,
                'municipio': municipio,
                'parroquia': parroquia,
                'ciudad': ciudad
            },
            'tipo': tipo
        }

        return filtros


class InmuebleDetailView(View):
    def get(self, request, id, *args, **kwargs):
        # Obtener un objeto de modelo
        inmueble = Inmueble.objects.get(id=id)
        inmueble.precio = self.formatearNumero(inmueble.precio)
        
        data = {
            'inmueble': inmueble
        }
        
        return render(request, 'InmuebleDetail/index.html', {'data': data})
    
    def formatearNumero(self, numero: float) -> str:
        return "{:,.2f}".format(numero).replace(",", " ").replace(".", ",").replace(" ", ".")