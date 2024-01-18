from django.db import models
import os
from django.conf import settings
# Create your models here.

def foto_agente_path(instance, filename):
    # 'agentes/' es la carpeta principal para todas las fotos de agentes
    # El nombre del archivo será el ID del agente con la extensión del archivo original
    ext = filename.split('.')[-1]

    # Si la instancia tiene un ID, verifica y elimina el archivo antiguo si existe
    if instance.id:
        old_file_path = os.path.join(settings.MEDIA_ROOT+f'/agentes/{instance.id}.{ext}') 

        if os.path.isfile(old_file_path):
            os.remove(old_file_path)

    # Si la instancia tiene un ID, usa ese ID en el nombre del archivo
    return f'agentes/{instance.id}.{ext}'


class AgenteInmobiliario(models.Model):
    nombre = models.CharField(max_length=255)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15)
    twitter = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    foto = models.ImageField(upload_to=foto_agente_path, blank=True, null=True)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre} ({self.correo}) ({self.telefono})"
