from django.contrib import admin
from .models import TipoTransaccion, Pais, Estado, Municipio, Parroquia, Ciudad, Direccion, TipoInmueble, EstadoInmueble, Inmueble

class DireccionAdmin(admin.ModelAdmin):
    list_display = ['descripcion', 'ciudad']
    search_fields = ['descripcion']

class PaisAdmin(admin.ModelAdmin):
    list_display = ['nombre']
    search_fields = ['nombre']

class EstadoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'pais']
    search_fields = ['nombre']
    
class MunicipioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'estado']
    search_fields = ['nombre']

class ParroquiaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'municipio']
    search_fields = ['nombre']

class CiudadAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'parroquia']
    search_fields = ['nombre']

class TipoInmuebleAdmin(admin.ModelAdmin):
    list_display = ['nombre']
    search_fields = ['nombre']
    
class EstadoInmuebleAdmin(admin.ModelAdmin):
    list_display = ['nombre']
    search_fields = ['nombre']
    
class TipoTransaccionAdmin(admin.ModelAdmin):
    list_display = ['nombre']
    search_fields = ['nombre']

class InmuebleAdmin(admin.ModelAdmin):
    list_display = ['id', 'ubicacion_direccion', 'tipo', 'estado']
    search_fields = ['id']
    
    list_filter = ['transaccion', 'disponible']

    
# Register your models here.
admin.site.register(Pais, PaisAdmin)
admin.site.register(Estado, EstadoAdmin)
admin.site.register(Municipio, MunicipioAdmin)
admin.site.register(Parroquia, ParroquiaAdmin)
admin.site.register(Ciudad, CiudadAdmin)
admin.site.register(TipoInmueble, TipoInmuebleAdmin)
admin.site.register(EstadoInmueble, EstadoInmuebleAdmin)
admin.site.register(TipoTransaccion, TipoTransaccionAdmin)

admin.site.register(Direccion, DireccionAdmin)
admin.site.register(Inmueble, InmuebleAdmin)