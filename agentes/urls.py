from django.urls import path
from .views import AgenteListView

app_name = 'agentes'
urlpatterns = [
    path('', AgenteListView.as_view(), name='home'),
]
