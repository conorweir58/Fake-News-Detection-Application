import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .forms import RegistrationForm


def register_account(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except:
            return JsonResponse({"error":"invalid JSON post"})

        form = RegistrationForm(data)
        if form.is_valid():
            form.save()
            return JsonResponse({"message" : "New user registered"})
        else:
            return JsonResponse({"errors": form.errors}, status=400)
        
    return JsonResponse({"error" : "POST required"})


def account_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except:
            return JsonResponse({"error":"invalid JSON post"})

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return JsonResponse({"error":"Need both password and email for login"})
        
        user = authenticate(request, username=email, password=password)

        if user:
            login(request, user)
            return JsonResponse({"message": "Login Successful"})
        
        return JsonResponse({"message":"Invalid creditionals"}, status=401)
    
    return JsonResponse({"error":"POST required"})