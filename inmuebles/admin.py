from django.contrib import admin

from .models import Pais, Estado, Municipio, Parroquia, Ciudad, Direccion, TipoInmueble, EstadoInmueble, FotoInmueble, Inmueble

# Register your models here.
admin.site.register(Pais)
admin.site.register(Estado)
admin.site.register(Municipio)
admin.site.register(Parroquia)
admin.site.register(Ciudad)
admin.site.register(Direccion)
admin.site.register(TipoInmueble)
admin.site.register(EstadoInmueble)
admin.site.register(FotoInmueble)
admin.site.register(Inmueble)