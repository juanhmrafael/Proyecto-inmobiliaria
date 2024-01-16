from django.urls import path
from . import views

urlpatterns = [
    path('', views.agentes, name='agentes'),
]
