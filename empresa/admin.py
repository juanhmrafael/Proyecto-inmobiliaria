from django.contrib import admin

from .models import InformacionEmpresa
# Register your models here.

class InformacionEmpresaAdmin(admin.ModelAdmin):
    list_display = ['nombre_empresa']

admin.site.register(InformacionEmpresa, InformacionEmpresaAdmin)