from django.shortcuts import render

# Importar modelos
from inmuebles.models import Pais, Estado, Municipio, Parroquia, Ciudad

import json
# Create your views here.

from django.views.generic import View #Para trabajar con vistas en función de clases 

class InmuebleListView(View):
    def get(self, request, *args, **kwargs):
        paises = list(Pais.objects.values())
        estados = list(Estado.objects.values())
        municicipios = list(Municipio.objects.values())
        parroquias = list(Parroquia.objects.values())
        ciudades = list(Ciudad.objects.values())
        
        data = {
            'ubicacion_filtro': {
                'paises': paises,
                'estados': estados,
                'municipios': municicipios,
                'parroquias': parroquias,
                'ciudades': ciudades,
            }
        }
        
        data_json = json.dumps(data)

        return render(request, 'InmuebleList/index.html', {'data': data_json})

class InmuebleDetailView(View):
    def get(self, request, *args, **kwargs):
        data = {}
        data_json = json.dumps(data)
        return render(request, 'InmuebleDetail/index.html', {'data': data_json})