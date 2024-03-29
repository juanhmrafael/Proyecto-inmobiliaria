from .models import InformacionEmpresa

def informacion_empresa(request):
    data = {'informacion_empresa': None}
    # Recuperar la información de la empresa desde la base de datos
    empresa = InformacionEmpresa.objects.first()  # Puedes ajustar esto según tus necesidades
    
    if empresa:
        data = {
            'informacion_empresa': empresa
        }
    # Retornar el diccionario con la información que deseas compartir con todas las plantillas
    return data