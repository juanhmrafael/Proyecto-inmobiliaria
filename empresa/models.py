import os
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

def nombrarLogo(instance, filename):
    ext = filename.split('.')[-1]

    # Si la instancia tiene un ID, verifica y elimina el archivo antiguo si existe
    if instance.id:
        try:
            existente = InformacionEmpresa.objects.get(pk=instance.id)
            ruta_anterior = existente.logo.path
            if os.path.isfile(ruta_anterior):
                os.remove(ruta_anterior)

        except Exception as e:
            # Manejar cualquier excepción al intentar eliminar el archivo antiguo
            print(f"Error al eliminar el archivo-logo_empresa antiguo: {e}")

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
    logo = models.ImageField(upload_to=nombrarLogo, null=True, blank=True)

    def __str__(self):
        return self.nombre_empresa.title()


@receiver(pre_save, sender=InformacionEmpresa)
def actualizar_logo(sender, instance, **kwargs):
    # Verificar si ya existe una instancia almacenada en la base de datos
    if instance.pk:
        try:
            # Obtener la instancia actual en la base de datos
            existente = InformacionEmpresa.objects.get(pk=instance.pk)
            # Verificar si la imagen ha cambiado
            if existente.logo and not instance.logo:
                ruta_anterior = existente.logo.path
                if os.path.isfile(ruta_anterior):
                    os.remove(ruta_anterior)
        except Exception:
            pass
