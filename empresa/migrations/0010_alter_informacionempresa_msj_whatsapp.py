# Generated by Django 5.0.1 on 2024-02-01 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empresa', '0009_informacionempresa_facebook_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='informacionempresa',
            name='msj_whatsapp',
            field=models.TextField(null=True),
        ),
    ]
