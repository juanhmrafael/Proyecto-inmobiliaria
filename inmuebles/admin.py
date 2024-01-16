from django.contrib import admin

from .models import Pais, Estado, Municipio, Parroquia, Ciudad

# Register your models here.
admin.site.register(Pais)
admin.site.register(Estado)
admin.site.register(Municipio)
admin.site.register(Parroquia)
admin.site.register(Ciudad)