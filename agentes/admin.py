from django.contrib import admin
from .models import AgenteInmobiliario
from django.contrib.auth.models import User, Group
from django import forms
# Register your models here.


class AgenteInmobiliarioAdminForm(forms.ModelForm):
    class Meta:
        model = AgenteInmobiliario
        exclude = []

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Obtener los grupos "Usuarios" y "Admins"
        usuarios_group = Group.objects.get(name='Usuarios')
        admins_group = Group.objects.get(name='Admins')

        # Filtrar el queryset de usuarios para mostrar el usuario asignado y aquellos que no están asociados a ningún AgenteInmobiliario,
        # pero excluyendo aquellos que pertenecen a los grupos "Usuarios" y "Admins"
        if self.instance and self.instance.usuario:
            self.fields['usuario'].queryset = User.objects.filter(
                id=self.instance.usuario.id) | User.objects.filter(asesor__isnull=True).exclude(groups__in=[usuarios_group, admins_group])
        else:
            self.fields['usuario'].queryset = User.objects.filter(
                asesor__isnull=True).exclude(groups__in=[usuarios_group, admins_group])


class AgenteInmobiliarioAdmin(admin.ModelAdmin):
    form = AgenteInmobiliarioAdminForm
    list_display = ['nombre',
                    'cedula',
                    'correo',
                    'telefono',
                    'foto']

    search_fields = ['cedula', 'nombre']


admin.site.register(AgenteInmobiliario, AgenteInmobiliarioAdmin)
