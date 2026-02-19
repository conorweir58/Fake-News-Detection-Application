from django.contrib.auth import logout
from .analyse import complete_analysis
from rest_framework.decorators import api_view
from .models import DetectionResults
from .account_handler import register_account, account_login
from .account_history import account_history
from .extraction.extraction_tool import (extract_from_file, extract_from_url, extract_from_text)
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

# EXTRACTION VIEWS - havent added text yet bc no real reason to test it bc its just setting text

def extract_url(request):

    url = request.data.get("url")

    if not url:
        return JsonResponse({"error": "No URL provided."}, status=400)

    article = extract_from_url()

    if article == None:
        return JsonResponse({"error": "Failed to extract data from URL"}, status=500)

    return JsonResponse({"title": article.title, "authors": article.authors, "publish_date": str(article.publish_date), "text": article.text}) # just return json for testing

def extract_text(request):
    text = request.data.get("text")

    if not text:
        return JsonResponse({"error": "No text provided."}, status=400)

    article = extract_from_text(text)

    if article == None:
        return JsonResponse({"error": "Failed to extract data from given text"}, status=500)

    return JsonResponse({"title": article.title, "authors": article.authors, "publish_date": str(article.publish_date), "text": article.text}) # just return json for testing

def extract_file(request):

    file = request.FILES.get("file")

    if not file:
        return JsonResponse({"error": "No file uploaded."}, status=400)
    
    article = extract_from_text(file)

    if article == None:
        return JsonResponse({"error": "Failed to extract data from file"}, status=500)

    return JsonResponse({"title": article.title, "authors": article.authors, "publish_date": str(article.publish_date), "text": article.text}) # just return json for testing

# ANALYSIS VIEWS

# The main function for running the detection models


@api_view(['POST'])
def analyse(request):       

    final_results = complete_analysis(request)

    return final_results


@api_view(['GET'])
def get_analysis(request, id):
    analysis_result = DetectionResults.objects.get(id=id)

    if analysis_result is None:
        return JsonResponse({"error": "No analysis results found yet."}, status=401)

    return JsonResponse({"id": analysis_result.id, "result": analysis_result.result, "True or False": analysis_result.pulk, "bias": analysis_result.bias, "AI or Human": analysis_result.gpt, "Sentiment":analysis_result.sentiment})



def register(request):
    message = register_account(request)
    return message


def login_to_account(request):
    message = account_login(request)
    return message

<<<<<<< HEAD
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return JsonResponse({"error":"Need both password and email for login"})
        
        user = authenticate(request, username=email, password=password)

        if user:
            login(request, user)
            return JsonResponse({"message": "Login Successful", "authenticated": "true"})
        
        return JsonResponse({"message":"Invalid creditionals", "authenticated": "false"})
    
    return JsonResponse({"error":"POST required"})
=======
>>>>>>> backend

def account_logout(request):
    logout(request)
    return JsonResponse({"message":"Logged out"})


@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({"message":"CSRF set"})


# Check if user is authenticated function for frontend
def check_auth(request):
    if request.user.is_authenticated:
        return JsonResponse({"authenticated": True, "email": request.user.email, "username": request.user.username})
    else:
        return JsonResponse({"authenticated": False}, status=401)


@api_view(['GET'])
def history(request):

    data = account_history(request)

    return data
