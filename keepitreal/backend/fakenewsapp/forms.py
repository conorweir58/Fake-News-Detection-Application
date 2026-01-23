from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import CustomUser

class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('username', 'email')

    def clean(self):
        cleaned_data = super.clean()
        if self.cleaned_data['password'] != self.cleaned_data['confirm_password']:
            raise forms.ValidationError("Passwords don't match!")