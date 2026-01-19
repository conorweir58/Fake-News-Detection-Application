from django.http import JsonResponse
from .detection_models import (pulk_pipe, sentiment_pipe, bias_pipe, gpt_pipe, googFactCheckSearch)
from .compute_trustworthiness import computation
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .extraction_tools import (extract_from_file, extract_from_url, extract_from_text)

# The main function for running the detection models
@api_view['POST']
def analyse(request):

    url = request.data.get("url")
    article_text = request.data.get("text")
    files = request.FILES.get("file")

    if url:
        text = extract_from_url(url)
    elif files:
        text = extract_from_file(files)
    elif article_text:
        text = extract_from_text(text)

    # here i call all the models with the given text
    pulk_result = pulk_pipe(text)
    print(pulk_result)
    sentiment_result = sentiment_pipe(text)
    print(sentiment_result)
    bias_result = bias_pipe(text)
    print(bias_result)
    gpt_result = gpt_pipe(text)
    print(gpt_result)
    fact_check_result = googFactCheckSearch(text)

    result = computation(pulk_result, sentiment_result, bias_result, gpt_result)

    #this is how i return the results as JSON
    return JsonResponse({"result": result, "True or False": pulk_result, "bias": bias_result, "AI or Human": gpt_result})
