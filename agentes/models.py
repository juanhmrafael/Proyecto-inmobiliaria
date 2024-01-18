from django.db import models
from django.db.models.signals import pre_save, pre_delete, post_save
from PIL import Image
from django.dispatch import receiver
import os
from django.conf import settings
# Create your models here.


def foto_agente_path(instance, filename):
    # 'agentes/' es la carpeta principal para todas las fotos de agentes
    # El nombre del archivo será el ID del agente con la extensión del archivo original
    ext = filename.split('.')[-1]

    # Si la instancia tiene un ID, verifica y elimina el archivo antiguo si existe
    if instance.id:
        try:
            old_file_path = os.path.join(
                settings.MEDIA_ROOT, 'agentes', f'{instance.id}.{ext}')
            if os.path.exists(old_file_path):
                os.remove(old_file_path)
        except Exception as e:
            # Manejar cualquier excepción al intentar eliminar el archivo antiguo
            print(f"Error al eliminar el archivo-foto_agente antiguo: {e}")

    # Si la instancia tiene un ID, usa ese ID en el nombre del archivo
    return f'agentes/{instance.id}.{ext}'


class AgenteInmobiliario(models.Model):
    cedula = models.CharField(
        max_length=20, unique=True, blank=False, null=True)  # Nueva línea
    nombre = models.CharField(max_length=255)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15)
    twitter = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    foto = models.ImageField(upload_to=foto_agente_path, blank=True, null=True)

    def clean(self) -> None:
        self.nombre = self.nombre.title()
        self.correo = self.correo.lower()

    def __str__(self) -> str:
        return f"{self.cedula if self.cedula is not None else ''} {self.nombre} ({self.correo}) ({self.telefono})"

    # Usar la señal post_save para redimensionar la imagen después de guardarla


@receiver(post_save, sender=AgenteInmobiliario)
def redimensionar_imagen(sender, instance, created, **kwargs):
    if instance.foto:
        try:
            # Abrir la imagen original
            image = Image.open(instance.foto.path)

            # Redimensionar la imagen a 600x600
            image = image.resize((600, 600))

            # Guardar la imagen redimensionada
            image.save(instance.foto.path)

        except Exception as e:
            # Manejar cualquier excepción al intentar redimensionar la imagen
            print(f"Error al redimensionar la imagen: {e}")
# Usar la señal pre_save para eliminar la imagen cuando se establece a None


@receiver(pre_save, sender=AgenteInmobiliario)
def eliminar_imagen_si_necesario(sender, instance, **kwargs):
    if instance.id is not None:
        try:
            # Obtener el valor actual del campo foto en la base de datos
            antigua_instancia = AgenteInmobiliario.objects.get(id=instance.id)
            # Verificar si el campo foto ha cambiado a None o se ha limpiado
            if antigua_instancia.foto and not instance.foto:
                # Eliminar el archivo antiguo
                old_file_path = os.path.join(
                    settings.MEDIA_ROOT, 'agentes', f'{instance.id}.{antigua_instancia.foto.name.split(".")[-1]}')
                if os.path.exists(old_file_path):
                    os.remove(old_file_path)
        except AgenteInmobiliario.DoesNotExist:
            pass  # Manejar el caso en que la instancia antigua no existe aún

# Usar la señal pre_delete para eliminar la imagen cuando se borra el registro


@receiver(pre_delete, sender=AgenteInmobiliario)
def eliminar_imagen_al_borrar(sender, instance, **kwargs):
    if instance.foto:
        try:
            # Eliminar el archivo asociado al campo foto
            file_path = os.path.join(settings.MEDIA_ROOT, instance.foto.name)
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error al eliminar la imagen asociada al borrar: {e}")
