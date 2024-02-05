# Generated by Django 5.0.1 on 2024-02-03 19:15

import agentes.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AgenteInmobiliario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cedula', models.CharField(max_length=20, unique=True)),
                ('nombre', models.CharField(max_length=255)),
                ('correo', models.EmailField(max_length=254, unique=True)),
                ('telefono', models.CharField(max_length=20, unique=True)),
                ('twitter', models.URLField(blank=True, null=True, unique=True)),
                ('facebook', models.URLField(blank=True, null=True, unique=True)),
                ('instagram', models.URLField(blank=True, null=True, unique=True)),
                ('linkedin', models.URLField(blank=True, null=True, unique=True)),
                ('foto', models.ImageField(blank=True, null=True, upload_to=agentes.models.foto_agente_path)),
            ],
            options={
                'verbose_name': 'Asesor inmobiliario',
                'verbose_name_plural': 'Asesores inmobiliario',
            },
        ),
    ]
