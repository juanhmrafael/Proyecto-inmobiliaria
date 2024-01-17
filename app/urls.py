from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


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

#Solo cuando estamos en DEBUG debido a que django protege y para producción hacer engine

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)