# Generated by Django 5.0.1 on 2024-02-06 12:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inmuebles', '0007_alter_inmueble_agente'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inmueble',
            old_name='disponible',
            new_name='disponibilidad_pagina',
        ),
    ]
