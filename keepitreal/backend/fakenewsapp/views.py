from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from .detection_models import (pulk_pipe, sentiment_pipe, bias_pipe, gpt_pipe, googFactCheckSearch)
from .compute_trustworthiness import computation
from rest_framework.decorators import api_view
from .extraction.extraction_tool import (extract_from_file, extract_from_url, extract_from_text)
from .models import DetectionResults, User_History
from .forms import RegistrationForm
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from django.forms.models import model_to_dict

# EXTRACTION VIEWS - havent added text yet bc no real reason to test it bc its just setting text

def extract_url(request):

    url = request.data.get("url")

    if not url:
        return JsonResponse({"error": "No URL provided."}, status=400)

    article = extract_from_url()

    return JsonResponse({"title": article.title, "authors": article.authors, "publish_date": str(article.publish_date), "text": article.text}) # just return json for testing

def extract_text(request):
    text = request.data.get("text")

    if not text:
        return JsonResponse({"error": "No text provided."}, status=400)

    article = extract_from_text(text)

    return JsonResponse({"title": article.title, "authors": article.authors, "publish_date": str(article.publish_date), "text": article.text}) # just return json for testing

def extract_file(request):

    file = request.FILES.get("file")

    if not file:
        return JsonResponse({"error": "No file uploaded."}, status=400)
    
    article = extract_from_text(file)


    return JsonResponse({"title": article.title, "authors": article.authors, "publish_date": str(article.publish_date), "text": article.text}) # just return json for testing

# ANALYSIS VIEWS

# The main function for running the detection models
@api_view(['POST'])
def analyse(request):       

    print("User:", request.user)
    print("Authenticated:", request.user.is_authenticated)

    url = request.data.get("url")
    article_text = request.data.get("text")
    files = request.FILES.get("file")
    

    if(files):
        selected_raw = request.data.get("selected")
        selected_flags = json.loads(selected_raw)
    else:
        selected_flags = request.data.get("selected")

    models = ["pulk", "sentiment", "bias", "gpt"]
    selected_models = [model for model, flag in zip(models, selected_flags) if flag]

    if url:
        article = extract_from_url(url)
        article_info = url
    elif files:
        article = extract_from_file(files)
        article_info = article.text
    elif article_text:
        article = extract_from_text(article_text)
        article_info = article.text

    api_models = {}
    final_results = {}


    # here i call all the models with the given text
    if "pulk" in selected_models:
        pulk_result = pulk_pipe(article.text[:1900])
        api_models["pulk"] = pulk_result
        final_results["True or False"] = pulk_result
        print(pulk_result)
    if "sentiment" in selected_models:
        sentiment_result = sentiment_pipe(article.text[:1900])
        api_models["sentiment"] = sentiment_result
        final_results["Sentiment"] = sentiment_result
        print(sentiment_result)
    if "bias" in selected_models:
        bias_result = bias_pipe(article.text[:1900])
        api_models["bias"] = bias_result
        final_results["bias"] = bias_result
        print(bias_result)
    if "gpt" in selected_models:
        gpt_result = gpt_pipe(article.text[:1900])
        api_models["gpt"] = gpt_result
        final_results["AI or Human"] = gpt_result
        print(gpt_result)
    # #
    # fact_check_result = googFactCheckSearch(text)


    result = computation(api_models)

    final_results["result"] = result

    if request.user.is_authenticated:
        info_obj = DetectionResults.objects.create(
            user=request.user, 
            text=article_info, 
            pulk=api_models.get("pulk"),
            bias=api_models.get("bias"),
            sentiment=api_models.get("sentiment"),
            gpt=api_models.get("gpt"), 
            result=result)
        info_obj.save()
        User_History.objects.create(user=request.user, response=info_obj)

    return JsonResponse(final_results)

@api_view(['GET'])
def get_analysis(request, id):
    analysis_result = DetectionResults.objects.get(id=id)

    if analysis_result is None:
        return JsonResponse({
            "error": "No analysis results found yet."
        }, status=404)

    return JsonResponse({"id": analysis_result.id, "result": analysis_result.result, "True or False": analysis_result.pulk, "bias": analysis_result.bias, "AI or Human": analysis_result.gpt, "Sentiment":analysis_result.sentiment})

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
        
        return JsonResponse({"message":"Invalid creditionals"})
    
    return JsonResponse({"error":"POST required"})

def account_logout(request):
    logout(request)
    return JsonResponse({"message":"Logged out"})

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({"message":"CSRF set"})

@api_view(['GET'])
def history(request):
    if not request.user.is_authenticated:
        return JsonResponse({"message": None})

    items = (User_History.objects.filter(user=request.user).select_related("response"))

    data = []

    for item in items:
        det = item.response  # DetectionResults instance

        data.append({
            "id": item.id,
            "response": {
                "id": det.id,
                "text": det.text,
                "result": det.result,
                "pulk": det.pulk,
                "sentiment": det.sentiment,
                "bias": det.bias,
                "gpt": det.gpt,
                "created_at": det.created_at,
            }
        })

    return JsonResponse(data, safe=False)

