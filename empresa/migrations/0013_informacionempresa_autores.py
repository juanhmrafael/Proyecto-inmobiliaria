# Generated by Django 5.0.1 on 2024-02-02 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empresa', '0012_alter_informacionempresa_msj_asesores_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='informacionempresa',
            name='autores',
            field=models.CharField(default='Fernando Rodríguez, Sebastian Salazar', max_length=255),
            preserve_default=False,
        ),
    ]
