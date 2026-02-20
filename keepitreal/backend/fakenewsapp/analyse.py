from .detection_models import (pulk_pipe, sentiment_pipe, bias_pipe, gpt_pipe)
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

    selected_raw = request.data.get("selected")

    if(files):
        selected_models = json.loads(selected_raw)
    else:
        selected_models = selected_raw

    print(selected_models)

    if not selected_models:
        return JsonResponse({"error": "No models added to call from selected_models"}, status=400)

    if url:
        article = extract_from_url(url)
        article_info = article.text
        article_title = article.title
    elif files:
        article = extract_from_file(files)
        article_info = article.text
        article_title = article.title
    elif article_text:
        article = extract_from_text(article_text)
        article_info = article.text
        article_title = article.title

    print(article_title)

    api_models = {}
    final_results = {}


    # here i call all the models with the given text
    if "pulk" in selected_models:
        pulk_result = pulk_pipe(article.text)
        api_models["pulk"] = pulk_result
        final_results["pulk"] = pulk_result
        print(pulk_result)
    if "sentiment" in selected_models:
        sentiment_result = sentiment_pipe(article.text)
        api_models["sentiment"] = sentiment_result
        final_results["sentiment"] = sentiment_result
        print(sentiment_result)
    if "bias" in selected_models:
        bias_result = bias_pipe(article.text)
        api_models["bias"] = bias_result
        final_results["bias"] = bias_result
        print(bias_result)
    if "gpt" in selected_models:
        gpt_result = gpt_pipe(article.text)
        api_models["gpt"] = gpt_result
        final_results["gpt"] = gpt_result
        print(gpt_result)

    # fact_check_result = googFactCheckSearch(article.title)
    # print(fact_check_result)


    result = computation(api_models)

    if not result:
        return JsonResponse({"error": "Failed to receive overall result from the models"}, status=500)

    final_results["result"] = result
    article_text=article.text.split(" ")
    final_results["text"] = " ".join(article_text[:300])

    if request.user.is_authenticated:
        try:
            info_obj = DetectionResults.objects.create(
                user=request.user, 
                text=article_info,
                title=article_title,
                pulk=api_models.get("pulk"),
                bias=api_models.get("bias"),
                sentiment=api_models.get("sentiment"),
                gpt=api_models.get("gpt"), 
                result=result)
            User_History.objects.create(user=request.user, response=info_obj)
        except:
            return JsonResponse({"error": "Failed to save submission"})
        
    return JsonResponse(final_results)
