from django.urls import path
from .views import  InmuebleListView, InmuebleDetailView

app_name = 'inmuebles'

urlpatterns = [
    path('', InmuebleListView.as_view(), name='home'),
    path('<>', InmuebleDetailView.as_view(), name='detail'),
]
