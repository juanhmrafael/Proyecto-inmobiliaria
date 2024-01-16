from django.contrib import admin
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('inicio.urls')),
    path('contacto/', include('contacto.urls')),
    path('acceso/', include('acceso.urls')),
    path('nosotros/', include('nosotros.urls')),
    path('servicios/', include('servicios.urls')),
    path('agentes/', include('agentes.urls')),
    path('inmuebles/', include('inmuebles.urls')),
]
