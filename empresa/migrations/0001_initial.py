# Generated by Django 5.0.1 on 2024-02-03 19:15

import empresa.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InformacionEmpresa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_empresa', models.CharField(max_length=80)),
                ('descripcion_empresa', models.TextField()),
                ('direccion', models.CharField(max_length=255)),
                ('pais', models.CharField(max_length=80)),
                ('estado', models.CharField(max_length=80)),
                ('ciudad', models.CharField(max_length=80)),
                ('cod_postal', models.CharField(max_length=10)),
                ('telefono', models.CharField(max_length=22)),
                ('correo_electronico', models.EmailField(max_length=254)),
                ('title_boletin', models.CharField(max_length=255)),
                ('descripcion_boletin', models.TextField()),
                ('logo', models.ImageField(blank=True, null=True, upload_to=empresa.models.nombrar_logo)),
                ('twitter', models.URLField(blank=True, null=True, unique=True)),
                ('facebook', models.URLField(blank=True, null=True, unique=True)),
                ('instagram', models.URLField(blank=True, null=True, unique=True)),
                ('linkedin', models.URLField(blank=True, null=True, unique=True)),
                ('msj_whatsapp', models.TextField(blank=True, null=True)),
                ('msj_asesores', models.TextField(blank=True, null=True)),
                ('autores', models.CharField(max_length=255)),
            ],
        ),
    ]