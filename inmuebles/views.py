from django.shortcuts import render
from django.template.loader import render_to_string

# Importar la biblioteca de HttpResponse
from django.http import HttpResponse, JsonResponse

# Importar la biblioteca de loader
from django.template import loader

# Importar modelos
from inmuebles.models import Pais, Estado, Municipio

import json
# Create your views here.

from django.views.generic import View #Para trabajar con vistas en función de clases 

class InmueblesListView(View):
    def get(self, request, *args, **kwargs):
        estados = []
        municipios = []
        
        paises = list(Pais.objects.values())
        if len(paises) > 0:
            estados = list(Estado.objects.values())
            if len(estados) > 0:
                municicipios = list(Municipio.objects.values())
        
        data = {
            'ubicacion_filtro': {
                'paises': paises,
                'estados': estados,
                'municipios': municicipios
            }
        }

        return render(request, 'inmuebles.html', data)
        

        
        
        
    

def get_paises(request):  # Devuelve diccionario de paises
    data = {'message': "Not Found"}
    paises = list(Pais.objects.values())

    if len(paises) > 0:
        data = {'message': "Success",
                'paises': paises}

    return JsonResponse(data)


# Devuelve diccionario de los estados seleccionados
def get_estados(request, paises_seleccionados: str):
    data = {'message': "Not Found"}
    paises = paises_seleccionados.split('_')
    paises_id = Pais.objects.filter(nombre__in=paises)

    if len(paises_id) > 0:
        estados = list(Estado.objects.filter(pais__in=paises_id).values())
        if len(estados) > 0:
            data = {'message': "Success",
                    'estados': estados}

    return JsonResponse(data)

# Devuelve diccionario de los municipios seleccionados


def get_municipios(request, paises_seleccionados: str, estados_seleccionados: str):
    data = {'message': "Not Found"}

    # Obtenemos los datos de los estados seleccionados
    estados_disponibles = json.loads(
        get_estados(request, paises_seleccionados).content)

    if estados_disponibles['message'] == "Success":  # Hay estados seleccionados
        estados = estados_seleccionados.split('_')

        estadosID = []
        for selec in estados:
            for estado in estados_disponibles['estados']:
                if selec.capitalize() == estado["nombre"]:
                    estadosID.append(estado["id"])
                    estados_disponibles['estados'].remove(estado)
                    break

        municipios = list(Municipio.objects.filter(
            estado__in=estadosID).values())

        if len(municipios) > 0:
            # Filtramos los municipios de esos estados
            data = {'message': "Success",
                    'municipios': municipios}

    return JsonResponse(data)


def inmuebles(request):
    return render(request, 'inmuebles.html')


def inmueble_individual(request):
    return render(request, 'inmueble-single.html')

