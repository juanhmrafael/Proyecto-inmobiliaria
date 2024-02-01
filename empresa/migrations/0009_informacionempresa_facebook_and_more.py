# Generated by Django 5.0.1 on 2024-02-01 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empresa', '0008_alter_informacionempresa_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='informacionempresa',
            name='facebook',
            field=models.URLField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='informacionempresa',
            name='instagram',
            field=models.URLField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='informacionempresa',
            name='linkedin',
            field=models.URLField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='informacionempresa',
            name='msj_whatsapp',
            field=models.TextField(default='Bienvenid@ a su inmobiliaria de confianza, ¡Destino Punta siempre para servirle!.'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='informacionempresa',
            name='twitter',
            field=models.URLField(blank=True, null=True, unique=True),
        ),
    ]
