from django.shortcuts import render

# Create your views here.
def nosotros(request):
    return render(request, 'nosotros.html')