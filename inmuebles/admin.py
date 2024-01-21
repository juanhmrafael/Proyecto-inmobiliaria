from django.contrib import admin
from .models import TipoTransaccion, Pais, Estado, Municipio, Parroquia, Ciudad, Direccion, TipoInmueble, EstadoInmueble, Inmueble

class DireccionAdmin(admin.ModelAdmin):
    list_display = ['descripcion']
    
    search_fields = ['descripcion']

# Register your models here.
admin.site.register(Pais)
admin.site.register(Estado)
admin.site.register(Municipio)
admin.site.register(Parroquia)
admin.site.register(Ciudad)
admin.site.register(Direccion, DireccionAdmin)
admin.site.register(TipoInmueble)
admin.site.register(EstadoInmueble)
admin.site.register(Inmueble)
admin.site.register(TipoTransaccion)