from django.shortcuts import render

# Create your views here.
def acceso(request):
    return render(request, 'acceso.html')