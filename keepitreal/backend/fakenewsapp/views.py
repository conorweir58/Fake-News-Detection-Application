from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from .detection_models import (pulk_pipe, sentiment_pipe, bias_pipe, gpt_pipe, googFactCheckSearch)
from .compute_trustworthiness import computation
from rest_framework.decorators import api_view
from .extraction_tools import (extract_from_file, extract_from_url, extract_from_text)
from .models import DetectionResults
from .forms import RegistrationForm
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
import json

# EXTRACTION VIEWS - havent added text yet bc no real reason to test it bc its just setting text

def extract_url(request):

    article = extract_from_url("https://www.politifact.com/article/2024/aug/06/in-context-why-did-harris-vp-pick-gov-tim-walz-say/") # hardcode for now

    return JsonResponse({"title": article.title, "authors": article.authors, "publish_date": str(article.publish_date), "text": article.text}) # just return json for testing

def extract_file(request):

    article = extract_from_file()

    return JsonResponse({"title": article.title, "authors": article.authors, "publish_date": str(article.publish_date), "text": article.text}) # just return json for testing

# ANALYSIS VIEWS

# The main function for running the detection models
@api_view(['POST'])
def analyse(request):       

    url = request.data.get("url")
    article_text = request.data.get("text")
    files = request.FILES.get("file")

    if url:
        article = extract_from_url(url)
    elif files:
        article = extract_from_file(files)
    elif article_text:
        article = extract_from_text(article_text)

    # here i call all the models with the given text
    pulk_result = pulk_pipe(article.text[:1900])
    print(pulk_result)
    sentiment_result = sentiment_pipe(article.text[:1900])
    print(sentiment_result)
    bias_result = bias_pipe(article.text[:1900])
    print(bias_result)
    gpt_result = gpt_pipe(article.text[:1900])
    print(gpt_result)
    #
    # fact_check_result = googFactCheckSearch(text)


    result = computation(pulk_result, sentiment_result, bias_result, gpt_result)

    info_obj = DetectionResults(pulk=pulk_result, bias=bias_result, sentiment=sentiment_result, gpt=gpt_result, text=article.text[:1900], result=result)
    info_obj.save()

    return JsonResponse({ "id": info_obj.id, "result": result, "True or False": pulk_result, "bias": bias_result, "AI or Human": gpt_result})

@api_view(['GET'])
def get_analysis(request, id):
    analysis_result = DetectionResults.objects.get(id=id)

    if analysis_result is None:
        return JsonResponse({
            "error": "No analysis results found yet."
        }, status=404)

    return JsonResponse({"id": analysis_result.id, "result": analysis_result.result, "True or False": analysis_result.pulk, "bias": analysis_result.bias, "AI or Human": analysis_result.gpt})

def register(request):
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

def login_to_account(request):
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
        
        return JsonResponse({"error":"Invalid creditionals"})
    
    return JsonResponse({"error":"POST required"})

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({"message":"CSRF set"})
