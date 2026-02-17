from .detection_models import (pulk_pipe, sentiment_pipe, bias_pipe, gpt_pipe, googFactCheckSearch)
from django.http import JsonResponse
from .extraction.extraction_tool import (extract_from_file, extract_from_url, extract_from_text)
from .compute_trustworthiness import computation
from .models import DetectionResults, User_History
import json

def complete_analysis(request):
    print("User:", request.user)
    print("Authenticated:", request.user.is_authenticated)

    url = request.data.get("url")
    article_text = request.data.get("text")
    files = request.FILES.get("file")
    
    if not (url or article_text or files):
        return JsonResponse({"error": "User must provide a URL, file or text."}, status=400)

    if(files):
        selected_raw = request.data.get("selected")
        selected_flags = json.loads(selected_raw)
    else:
        selected_flags = request.data.get("selected")

    if not selected_flags:
        return JsonResponse({"error": "No models have been selected"}, status=400)

    models = ["pulk", "sentiment", "bias", "gpt"]
    selected_models = [model for model, flag in zip(models, selected_flags) if flag]

    if not selected_models:
        return JsonResponse({"error": "No models added to call from selected_models"}, status=400)

    if url:
        article = extract_from_url(url)
        article_info = article
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

    if not result:
        return JsonResponse({"error": "Failed to receive overall result from the models"}, status=500)

    final_results["result"] = result

    if request.user.is_authenticated:
        try:
            info_obj = DetectionResults.objects.create(
                user=request.user, 
                text=article_info, 
                pulk=api_models.get("pulk"),
                bias=api_models.get("bias"),
                sentiment=api_models.get("sentiment"),
                gpt=api_models.get("gpt"), 
                result=result)
            User_History.objects.create(user=request.user, response=info_obj)
        except:
            return JsonResponse({"error": "Failed to save submission"})
        
    return JsonResponse(final_results)
