from django import forms

class FormCorreo(forms.Form):
    nombre = forms.CharField(label="Nombre",
                             widget=forms.TextInput(attrs={"placeholder": "Nombre", 
                                                           "class": "form-control",
                                                           "id": "nombre"}),
                             max_length=100
                             )
    
    email = forms.CharField(label="Correo Electrónico",
                            widget=forms.TextInput(attrs={"placeholder": "Correo Electrónico", 
                                                          "class": "form-control",
                                                          "id": "email"})
                            )
    
    asunto = forms.CharField(label="Asunto",
                             widget=forms.TextInput(attrs={"placeholder": "Asunto",
                                                           "class": "form-control",
                                                          "id": "asunto"}),
                             max_length=100
                             )
    
    mensaje = forms.CharField(label="Mensaje",
                              widget=forms.Textarea(attrs={"placeholder": "Mensaje",
                                                           "class": "form-control",
                                                          "id": "mensaje", "style": "height: 300px"})
                              )