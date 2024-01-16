from django.urls import path
from . import views

urlpatterns = [
    path('', views.mensaje_correo, name='mensaje_correo'),
]
