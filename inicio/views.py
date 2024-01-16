from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect#csrf_excempt - para omitir el token csrf por defecto en los formularios

# Create your views here.
def inicio(request):
    return render(request, 'inicio.html')