from django.urls import path
from . import views

urlpatterns = [
    path('', views.inmuebles, name='inmuebles'),
    path('en-paises/', views.get_paises, name='get_paises'),
    path('en-paises/<str:paises_seleccionados>',
         views.get_estados, name='get_estados'),
    path('en-paises/<str:paises_seleccionados>/en-estados/<str:estados_seleccionados>',
         views.get_municipios, name='get_municipios'),
    path('inmueble-ref/', views.inmueble_individual, name='inmueble-ref'),
]
