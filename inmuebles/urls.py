from django.urls import path
from .views import InmueblesListView, inmueble_individual, get_paises, get_estados, get_municipios

app_name = 'inmuebles'

urlpatterns = [
    path('', InmueblesListView.as_view(), name='home'),
    path('en-paises/', get_paises, name='get_paises'),

    path('en-paises/<str:paises_seleccionados>',
         get_estados, name='get_estados'),

    path('en-paises/<str:paises_seleccionados>/en-estados/<str:estados_seleccionados>',
         get_municipios, name='get_municipios'),

    path('inmueble-ref/', inmueble_individual, name='inmueble-ref'),
]
