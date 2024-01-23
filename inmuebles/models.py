from django.db import models
from agentes.models import AgenteInmobiliario

# Modelo de país


class Pais(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    codigo = models.CharField(max_length=2, unique=True)
    codigo_telefono = models.CharField(max_length=10)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre}"

    # class Meta: #Sirve para cambiar el nombre con el que se guardara la tabla y no por defecto que es nombreApp_table
    #     db_table = 'pais'
    class Meta:
        verbose_name = "Pais"
        verbose_name_plural = "Paises"
# Modelo de estado


class Estado(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre} -> {self.pais.nombre}"

    class Meta:
        verbose_name = "Estado"
        verbose_name_plural = "Estados"
        
# Modelo de municipio
class Municipio(models.Model):
    nombre = models.CharField(max_length=255)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre} -> {self.estado}"
    
    class Meta:
        verbose_name = "Municipio"
        verbose_name_plural = "Municipios"
# Modelo de parroquia


class Parroquia(models.Model):
    nombre = models.CharField(max_length=255)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre} -> {self.municipio}"
    
    class Meta:
        verbose_name = "Parroquia"
        verbose_name_plural = "Parroquias"
# Modelo de ciudad


class Ciudad(models.Model):
    nombre = models.CharField(max_length=255)
    parroquia = models.ForeignKey(Parroquia, on_delete=models.CASCADE)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre} -> {self.parroquia}"
    
    class Meta:
        verbose_name = "Ciudad"
        verbose_name_plural = "Ciudades"

class Direccion(models.Model):
    ciudad = models.ForeignKey(Ciudad, on_delete=models.CASCADE)
    descripcion = models.TextField(unique=True)
    ubicacion_google_maps = models.URLField(
        max_length=600, blank=True, null=True)

    def clean(self) -> None:
        self.descripcion = self.descripcion.title()

    def __str__(self) -> str:
        return f"{self.ciudad.nombre} - {self.descripcion}"

    class Meta:
        verbose_name = "Dirección"
        verbose_name_plural = "Direcciones"
        
class TipoInmueble(models.Model):
    nombre = models.CharField(max_length=255, unique=True)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Tipo de inmueble"
        verbose_name_plural = "Tipos de inmueble"
        
class EstadoInmueble(models.Model):
    nombre = models.CharField(max_length=255, unique=True)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return self.nombre
    
    class Meta:
        verbose_name = "Estado de inmueble"
        verbose_name_plural = "Estados de inmueble"

class TipoTransaccion(models.Model):
    nombre = models.CharField(max_length=255, unique=True)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return self.nombre

    class Meta:
        verbose_name = "Tipo transacción"
        verbose_name_plural = "Tipos de transacción"
        
class Inmueble(models.Model):
    nombre = models.CharField(max_length=255)
    tipo = models.ForeignKey(TipoInmueble, on_delete=models.CASCADE)
    estado = models.ForeignKey(EstadoInmueble, on_delete=models.CASCADE)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=20, decimal_places=2)
    habitaciones = models.PositiveIntegerField()
    banos = models.PositiveIntegerField()
    area = models.DecimalField(max_digits=8, decimal_places=2)
    ubicacion_direccion = models.ForeignKey(
        Direccion, on_delete=models.CASCADE)
    agente = models.ForeignKey(AgenteInmobiliario, on_delete=models.CASCADE)
    puestos_estacionamiento = models.PositiveIntegerField(default=0)

    transaccion = models.ForeignKey(TipoTransaccion, on_delete=models.CASCADE)
    disponible = models.BooleanField(default=True)

    def clean(self) -> None:
        self.nombre = self.nombre.title()
        self.descripcion = self.descripcion.capitalize()

    def __str__(self) -> str:
        return f"{'Disponible' if self.disponible else 'No disponible'} -> {self.nombre} ({self.tipo.nombre}) - {self.estado.nombre} - Agente: {self.agente.nombre}"
    
    class Meta:
        verbose_name = "Inmueble"
        verbose_name_plural = "Inmuebles"