from django.contrib import admin
from .models import Servicio, ImagenInmueble, TipoTransaccion, Pais, Estado, Municipio, Parroquia, Ciudad, Direccion, TipoInmueble, EstadoInmueble, Inmueble
from django.contrib.auth.models import User
from django import forms


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


class InmuebleAdminForm(forms.ModelForm):
    class Meta:
        model = Inmueble
        exclude = []

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)
        if not self.instance.agente and self.request and self.request.user.groups.filter(name='Asesores').exists():
            # Asignar el agente actual si no hay uno asignado y el usuario actual pertenece al grupo "Asesores"
            self.instance.agente = self.request.user.asesor


class InmuebleAdmin(admin.ModelAdmin):
    form = InmuebleAdminForm
    list_display = ('id', 'tipo', 'pais', 'ubestado',
                    'municipio', 'parroquia', 'ciudad', 'ubicacion_direccion')
    search_fields = ['id']
    list_filter = ['estado', 'transaccion', 'disponibilidad_pagina']
    inlines = [
        DireccionInline,
        ImagenInmuebleAdmin,
        ServicioInline
    ]

    def get_form(self, request, obj=None, **kwargs):
        # Agregar el objeto 'request' al formulario
        form = super().get_form(request, obj, **kwargs)
        form.request = request

        if request.user.groups.filter(name='Asesores').exists():
            # Filtrar el queryset del campo 'agente' solo para el agente actual
            form.base_fields['agente'].queryset = form.base_fields['agente'].queryset.filter(
                usuario=request.user)
        return form

    def get_queryset(self, request):
        # Filtrar los inmuebles por el usuario actual
        qs = super().get_queryset(request)
        if request.user.is_superuser or request.user.groups.filter(name='Admins').exists():
            return qs
        return qs.filter(agente__usuario=request.user)

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
