# Generated by Django 5.0.1 on 2024-01-19 01:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inmuebles', '0010_alter_inmueble_fotos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inmueble',
            name='fotos',
        ),
    ]
