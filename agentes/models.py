from django.db import models
from django.db.models.signals import pre_save, pre_delete, post_save
from PIL import Image
from django.dispatch import receiver
import os
# Create your models here.


def foto_agente_path(instance, filename):
    if instance.id:  # Si no es primera vez, borra la anterior si es que la hay y da nombre con el id
        # 'agentes/' es la carpeta principal para todas las fotos de agentes
        # El nombre del archivo será el ID del agente con la extensión del archivo original
        ext = filename.split('.')[-1]

        # Eliminar archivo antiguo si existe
        existente = AgenteInmobiliario.objects.get(pk=instance.pk)
        if existente.foto:
            ruta_anterior = existente.foto.path
            if os.path.isfile(ruta_anterior):
                os.remove(ruta_anterior)

        # Si la instancia tiene un ID, usa ese ID en el nombre del archivo
        return f'agentes/{instance.id}.{ext}'
    # Si es la primera vez la deja con el nombre original
    return f'agentes/{filename}'


class AgenteInmobiliario(models.Model):
    cedula = models.CharField(
        max_length=20, unique=True, blank=False, null=False)  # Nueva línea
    nombre = models.CharField(max_length=255)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, unique=True)
    twitter = models.URLField(blank=True, null=True, unique=True)
    facebook = models.URLField(blank=True, null=True, unique=True)
    instagram = models.URLField(blank=True, null=True, unique=True)
    linkedin = models.URLField(blank=True, null=True, unique=True)
    foto = models.ImageField(upload_to=foto_agente_path, blank=True, null=True)

    def clean(self) -> None:
        self.nombre = self.nombre.title()
        self.correo = self.correo.lower()

    def __str__(self) -> str:
        return f"{self.cedula if self.cedula is not None else ''} {self.nombre} ({self.correo}) ({self.telefono})"

    class Meta:
        verbose_name = "Agente inmobiliario"
        verbose_name_plural = "Agentes inmobiliario"
    # Usar la señal post_save para redimensionar la imagen después de guardarla


@receiver(post_save, sender=AgenteInmobiliario)
def redimensionar_imagen(sender, instance, created, **kwargs):
    if instance.foto:
        if created:  # Por primera vez la renombra
            # Obtener la extensión original de la foto
            ext = instance.foto.path.split('.')[-1]
            # Obtener la ruta actual de la foto
            ruta_anterior = instance.foto.path
            # Construir el nuevo nombre de la foto con el ID del agente
            nuevo_nombre = f'{instance.id}.{ext}'
            # Obtener la ruta actual de la foto
            ruta_anterior = instance.foto.path
            # Construir la nueva ruta con el nuevo nombre
            nueva_ruta = os.path.join(
                os.path.dirname(ruta_anterior), nuevo_nombre)
            # Renombrar la foto
            os.rename(ruta_anterior, nueva_ruta)
            # Actualizar la referencia a la foto en la base de datos
            instance.foto.name = 'agentes/'+nuevo_nombre
            instance.save()

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
    if instance.id and not instance.foto:
        # Obtener el valor actual del campo foto en la base de datos
        existente = AgenteInmobiliario.objects.get(id=instance.id)
        # Verificar si el campo foto ha cambiado a None o se ha limpiado
        if existente.foto:
            ruta_anterior = existente.foto.path
            if os.path.exists(ruta_anterior):
                os.remove(ruta_anterior)

# Usar la señal pre_delete para eliminar la imagen cuando se borra el registro


@receiver(pre_delete, sender=AgenteInmobiliario)
def eliminar_imagen_al_borrar(sender, instance, **kwargs):
    # Eliminar archivo antiguo si existe
    if instance.foto:
        ruta_anterior = instance.foto.path
        if os.path.exists(ruta_anterior):
            os.remove(ruta_anterior)
