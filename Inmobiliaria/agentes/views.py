from django.shortcuts import render

# Create your views here.
def agentes(request):
    return render(request, 'agentes.html')