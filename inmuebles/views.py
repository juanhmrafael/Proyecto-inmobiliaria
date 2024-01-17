from django.shortcuts import render

# Importar modelos
from inmuebles.models import Pais, Estado, Municipio

import json
# Create your views here.

from django.views.generic import View #Para trabajar con vistas en función de clases 

class InmuebleListView(View):
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
        
        data_json = json.dumps(data)

        return render(request, 'InmuebleList/index.html', {'data': data_json})

class InmuebleDetailView(View):
    def get(self, request, *args, **kwargs):
        data = {}
        data_json = json.dumps(data)
        return render(request, 'InmuebleDetail/index.html', {'data': data_json})