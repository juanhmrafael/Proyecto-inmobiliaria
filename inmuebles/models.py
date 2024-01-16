from django.db import models

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

# Modelo de estado


class Estado(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre} ({self.pais.nombre})"


# Modelo de municipio
class Municipio(models.Model):
    nombre = models.CharField(max_length=255)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre} ({self.estado.nombre})"

# Modelo de parroquia


class Parroquia(models.Model):
    nombre = models.CharField(max_length=255)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre} ({self.municipio.nombre})"

# Modelo de ciudad


class Ciudad(models.Model):
    nombre = models.CharField(max_length=255)
    parroquia = models.ForeignKey(Parroquia, on_delete=models.CASCADE)

    def clean(self) -> None:
        self.nombre = self.nombre.capitalize()

    def __str__(self) -> str:
        return f"{self.nombre} ({self.parroquia.nombre})"
