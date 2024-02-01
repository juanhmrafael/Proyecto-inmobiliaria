import os
from django.db import models
from django.db.models.signals import pre_save, pre_delete
from django.dispatch import receiver

def nombrar_logo(instance, filename):#Función para guardado de imagen
    ext = filename.split('.')[-1]

    # Eliminar archivo antiguo si existe
    existente = InformacionEmpresa.objects.get(pk=instance.pk)
    if existente.logo:
        ruta_anterior = existente.logo.path
        if os.path.isfile(ruta_anterior):
            os.remove(ruta_anterior)

    return f'Empresa/logo.{ext}'


class InformacionEmpresa(models.Model):
    nombre_empresa = models.CharField(max_length=80)
    descripcion_empresa = models.TextField()
    direccion = models.CharField(max_length=255)
    pais = models.CharField(max_length=80)
    estado = models.CharField(max_length=80)
    ciudad = models.CharField(max_length=80)
    cod_postal = models.CharField(max_length=10)
    telefono = models.CharField(max_length=22)
    correo_electronico = models.EmailField()
    title_boletin = models.CharField(max_length=255)
    descripcion_boletin = models.TextField()
    logo = models.ImageField(upload_to = nombrar_logo, null=True, blank=True)
    twitter = models.URLField(blank=True, null=True, unique=True)
    facebook = models.URLField(blank=True, null=True, unique=True)
    instagram = models.URLField(blank=True, null=True, unique=True)
    linkedin = models.URLField(blank=True, null=True, unique=True)
    msj_whatsapp = models.TextField(null=True)
    
    def __str__(self):
        return self.nombre_empresa.title()


@receiver(pre_save, sender=InformacionEmpresa)#Señal que borra la imagen si está vacía
def borrar_logo_al_actualizar(sender, instance, **kwargs):
    # Verificar si la imagen ha cambiado
    if instance.id and not instance.logo:
        existente = InformacionEmpresa.objects.get(id=instance.id)
        if existente.logo:
            ruta_anterior = existente.logo.path
            if os.path.exists(ruta_anterior):
                os.remove(ruta_anterior)
                
@receiver(pre_delete, sender=InformacionEmpresa)#Señal que borra el logo al ser eliminado su registro
def borrar_logo_al_eliminar(sender, instance, **kwargs):
    # Eliminar archivo antiguo si existe
    if instance.logo:
        ruta_anterior = instance.logo.path
        if os.path.exists(ruta_anterior):
            os.remove(ruta_anterior)