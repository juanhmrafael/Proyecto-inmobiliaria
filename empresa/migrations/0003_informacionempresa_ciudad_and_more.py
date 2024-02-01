# Generated by Django 5.0.1 on 2024-01-31 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empresa', '0002_alter_informacionempresa_telefono'),
    ]

    operations = [
        migrations.AddField(
            model_name='informacionempresa',
            name='ciudad',
            field=models.CharField(default=1, max_length=80),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='informacionempresa',
            name='cod_postal',
            field=models.CharField(default=1, max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='informacionempresa',
            name='estado',
            field=models.CharField(default=1, max_length=80),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='informacionempresa',
            name='pais',
            field=models.CharField(default=1, max_length=80),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='informacionempresa',
            name='nombre_empresa',
            field=models.CharField(max_length=80),
        ),
    ]
