from django.contrib import admin
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('inicio.urls', namespace='inicio')),
    path('contacto/', include('contacto.urls', namespace='contacto')),
    path('acceso/', include('acceso.urls', namespace='acceso')),
    path('nosotros/', include('nosotros.urls', namespace='nosotros')),
    path('servicios/', include('servicios.urls', namespace='servicios')),
    path('agentes/', include('agentes.urls', namespace='agentes')),
    path('inmuebles/', include('inmuebles.urls', namespace='inmuebles')),
]
