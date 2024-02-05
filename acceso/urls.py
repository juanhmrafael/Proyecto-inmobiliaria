from django.urls import path
from .views import LoginView, LogoutView


app_name = 'acceso'
urlpatterns = [
    path('', LoginView.as_view(), name='home'),
    path('cerrar_sesion', LogoutView.as_view(), name='cerrar_sesion'),
]
