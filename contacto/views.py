from django.shortcuts import render
from .forms import FormCorreo#Importamos nuestros formularios creados
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect#csrf_excempt - para omitir el token csrf por defecto en los formularios
from django.core.mail import send_mail#Para enviar correos

# Create your views here.

@csrf_protect
def mensaje_correo(request):
    if request.method == 'POST':
        form = FormCorreo(request.POST)
        if form.is_valid():
            #Para obtener datos siempre usar form.cleaned_data
            nombre = form.cleaned_data['nombre']
            email = form.cleaned_data['email']
            mensaje = form.cleaned_data['mensaje']
            asunto = form.cleaned_data['asunto']
            
            #Procesar los datos del formulario
            send_mail(
                asunto,#Asunto
                f'{nombre}: {mensaje}',#Mensaje
                email,#Correo de envío
                ['correo-inmobiliaria@gmail.com'],#Correo de recepción
                fail_silently=False,
            )
            
            return JsonResponse({'mensaje': 'Mensaje enviado!'})
    else:
        #En caso cura solicitud no sea POST
        form = FormCorreo()
    return render(request, 'contacto.html', {'form': form})
    
