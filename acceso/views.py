from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views.generic import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.utils.decorators import method_decorator

# Create your views here.


@method_decorator(login_required, name='dispatch')
class LogoutView(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect('inicio:home')


class LoginView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'acceso.html')

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            if 'login_form' in request.POST:
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
                else:
                    messages.error(
                        request, 'Nombre de usuario o contraseña incorrectos.')

            elif 'signup_form' in request.POST:
                print('signup')

            return self.get(request)
