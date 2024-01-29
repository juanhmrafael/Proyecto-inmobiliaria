from django.urls import path
from .views import  InmuebleListView, InmuebleDetailView

app_name = 'inmuebles'

urlpatterns = [
    path('busqueda', InmuebleListView.as_view(), name='home'),
    
    path('busqueda/codigo:<int:id>', InmuebleDetailView.as_view(), name='detail'),
]
