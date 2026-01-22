from django.http import JsonResponse
from .detection_models import (pulk_pipe, sentiment_pipe, bias_pipe, gpt_pipe, googFactCheckSearch)
from .extraction_tools import extract_from_url, extract_from_text, extract_from_file
from .compute_trustworthiness import computation
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .extraction_tools import (extract_from_file, extract_from_url, extract_from_text)
from .models import DetectionResults

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
        text = extract_from_url(url)
    elif files:
        text = extract_from_file(files)
    elif article_text:
<<<<<<< HEAD
        text = article_text
=======
        text = extract_from_text(article_text)
>>>>>>> development

    # here i call all the models with the given text
    pulk_result = pulk_pipe(text)
    print(pulk_result)
    sentiment_result = sentiment_pipe(text)
    print(sentiment_result)
    bias_result = bias_pipe(text)
    print(bias_result)
    gpt_result = gpt_pipe(text)
    print(gpt_result)
    #
    # fact_check_result = googFactCheckSearch(text)


    result = computation(pulk_result, sentiment_result, bias_result, gpt_result)

    info_obj = DetectionResults(pulk=pulk_result, bias=bias_result, sentiment=sentiment_result, gpt=gpt_result, text=text, result=result)
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