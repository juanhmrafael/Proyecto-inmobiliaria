from django.shortcuts import render
from django.views.generic import View #Para trabajar con vistas en función de clases 
from .models import AgenteInmobiliario

class AgenteListView(View):
    def get(self, request, *args, **kwargs):
        agentes = list(AgenteInmobiliario.objects.values())
        data = {
            'agentes': agentes
        }
        return render(request, 'AgenteListView/index.html', {'data': data})