# Generated by Django 5.0.1 on 2024-02-02 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empresa', '0010_alter_informacionempresa_msj_whatsapp'),
    ]

    operations = [
        migrations.AddField(
            model_name='informacionempresa',
            name='msj_asesores',
            field=models.TextField(null=True),
        ),
    ]
