from django.contrib import admin

from .models import AgenteInmobiliario
# Register your models here.

class AgenteInmobiliarioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 
                    'cedula',
                    'correo', 
                    'telefono', 
                    'foto']
    
    search_fields = ['cedula', 'telefono', 'correo']
    
    

admin.site.register(AgenteInmobiliario, AgenteInmobiliarioAdmin)