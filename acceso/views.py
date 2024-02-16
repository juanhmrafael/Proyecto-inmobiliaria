from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views.generic import View
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.utils.decorators import method_decorator
from django.contrib.auth.models import Group
from .forms import CustomUserCreationForm
from json import dumps
# Create your views here.


@method_decorator(login_required, name='dispatch')
class LogoutView(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect('inicio:home')


class LoginView(View):
    def get(self, request, is_login: bool = True, * args, **kwargs):
        return render(request, 'acceso.html', {'is_login': dumps(is_login)})

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            if 'login_form' in request.POST:
                is_login = True
                username = request.POST['username']
                password = request.POST['password']
                user = authenticate(
                    request, username=username, password=password)

                if user is not None:
                    login(request, user)
                    # Redirigir a la página deseada después del inicio de sesión
                    if user.is_staff:
                        return redirect('/panel_administrativo/')
                    return redirect('inicio:home')

                messages.error(
                    request, 'Nombre de usuario y/o contraseña incorrectos.')

            elif 'signup_form' in request.POST:
                is_login = False

                form = CustomUserCreationForm(request.POST)

                if form.is_valid():
                    form.save()
                    # Agregar el usuario al grupo "Usuarios"
                    group = Group.objects.get(name='Usuarios')

                    username = form.cleaned_data.get('username')
                    raw_password = form.cleaned_data.get('password1')
                    user = authenticate(username=username,
                                        password=raw_password)
                    user.groups.add(group)
                    login(request, user)
                    return redirect('inicio:home')

                # Diccionario de nombres personalizados para campos
                custom_field_names = {
                    'password2': 'Confirmar contraseña',
                    'password1': 'Contraseña',
                    'email': 'Correo electrónico',
                    'username': 'Nombre de usuario',
                    'last_name': 'Apellido',
                    'first_name': 'Nombre'
                    # Agrega más nombres personalizados para otros campos si lo deseas
                }

                # Recorremos los errores del formulario y los pasamos a messages.error
                for field, errors in form.errors.items():
                    if field in custom_field_names:
                        custom_field_name = custom_field_names[field]
                        for error in errors:
                            messages.error(
                                request, f"{custom_field_name}: {error}")
                    else:
                        # Si no hay un nombre personalizado, mostramos el nombre del campo original
                        for error in errors:
                            messages.error(
                                request, f"{field.capitalize()}: {error}")

            return self.get(request, is_login)
