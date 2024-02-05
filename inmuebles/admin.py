from django.contrib import admin
from .models import Servicio, ImagenInmueble, TipoTransaccion, Pais, Estado, Municipio, Parroquia, Ciudad, Direccion, TipoInmueble, EstadoInmueble, Inmueble


class PaisAdmin(admin.ModelAdmin):
    list_display = ['nombre']
    search_fields = ['nombre']


class EstadoAdmin(admin.ModelAdmin):
    list_display = ['nombre']
    search_fields = ['nombre']


class MunicipioAdmin(admin.ModelAdmin):
    list_display = ['nombre']
    search_fields = ['nombre']


class ParroquiaAdmin(admin.ModelAdmin):
    list_display = ['nombre']
    search_fields = ['nombre']


class CiudadAdmin(admin.ModelAdmin):
    list_display = ['nombre']
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


class ImagenInmuebleAdmin(admin.StackedInline):
    model = ImagenInmueble
    extra = 1


class DireccionInline(admin.StackedInline):
    model = Direccion
    min_num = 1  # Número mínimo de formularios requeridos


class ServicioInline(admin.TabularInline):
    model = Servicio
    extra = 0


class InmuebleAdmin(admin.ModelAdmin):
    list_display = ['id', 'tipo', 'pais', 'ubestado',
                    'municipio', 'parroquia', 'ciudad', 'ubicacion_direccion']
    search_fields = ['id']
    list_filter = ['estado', 'transaccion', 'disponible']
    inlines = [
        DireccionInline,
        ImagenInmuebleAdmin,
        ServicioInline
    ]

    def pais(self, obj):
        return obj.ubicacion_direccion.pais

    def ubestado(self, obj):
        return obj.ubicacion_direccion.estado

    def municipio(self, obj):
        return obj.ubicacion_direccion.municipio

    def parroquia(self, obj):
        return obj.ubicacion_direccion.parroquia

    def ciudad(self, obj):
        return obj.ubicacion_direccion.ciudad

    pais.short_description = 'País'
    ubestado.short_description = 'Estado'
    municipio.short_description = 'Municipio'
    parroquia.short_description = 'Parroquia'
    ciudad.short_description = 'Ciudad'


# Register your models here.
admin.site.register(Pais, PaisAdmin)
admin.site.register(Estado, EstadoAdmin)
admin.site.register(Municipio, MunicipioAdmin)
admin.site.register(Parroquia, ParroquiaAdmin)
admin.site.register(Ciudad, CiudadAdmin)
admin.site.register(TipoInmueble, TipoInmuebleAdmin)
admin.site.register(EstadoInmueble, EstadoInmuebleAdmin)
admin.site.register(TipoTransaccion, TipoTransaccionAdmin)
admin.site.register(Inmueble, InmuebleAdmin)
