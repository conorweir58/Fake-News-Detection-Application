from transformers import pipeline
from django.conf import settings

import requests

HF_Key = settings.PULK17_HF_KEY
pulk_pipe = pipeline("text-classification", model="Andrewbrady27/Fake-News-Pulk17", token=HF_Key)

gpt_pipe = pipeline("text-classification", model="Hello-SimpleAI/chatgpt-detector-roberta")

sentiment_pipe = pipeline("sentiment-analysis", model="mervp/SentimentBERT")

bias_pipe = pipeline("text-classification", model="cirimus/modernbert-large-bias-type-classifier", return_all_scores=True)

def googFactCheckSearch(request):

    query = "Muhammad Ali defeated George Foreman"
    api_key = settings.GOOGLE_FACTCHECK_API_KEY
    factcheck_url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"

    params = {
        "query" : query,
        "key" : api_key,
    }

    try:
        response = requests.get(factcheck_url, params=params)
        response.raise_for_status()
    except requests.exceptions.HTTPError as errh:
        print("HTTP Error")
        print(errh.args[0])
    except requests.exceptions.ReadTimeout as errrt:
        print("Time out")
    except requests.exceptions.ConnectionError as conerr:
        print("Connection error")
    except requests.exceptions.RequestException as errex:
        print("Exception request")
    else:
        print("success")
        return response.json()
    