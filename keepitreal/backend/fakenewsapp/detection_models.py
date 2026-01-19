from transformers import pipeline
from django.conf import settings
import requests

# The purpose of this file is to store all the models. They are loaded once at startup to save repeated initialisation

#----------------------------

# Using the PULK17 model on hugging face however I had to add certain files to model for functionality hence it is coming from my account

HF_Key = settings.PULK17_HF_KEY # My hugging face key because the model is private
pulk_pipe = pipeline("text-classification", model="Andrewbrady27/Fake-News-Pulk17", token=HF_Key)

#----------------------------

# This model from hugging face classifies whether text is AI-generated or Human created.
gpt_pipe = pipeline("text-classification", model="Hello-SimpleAI/chatgpt-detector-roberta")

#----------------------------

# This model performs a sentiment analysis on the text to check if it is positive or neutral specifically trained on news articles, it is also hosted on hugging face
sentiment_pipe = pipeline("sentiment-analysis", model="mervp/SentimentBERT")

#----------------------------

#This model is also hosted on hugging face, it searches for multiple types of bias within the text
bias_pipe = pipeline("text-classification", model="cirimus/modernbert-large-bias-type-classifier", return_all_scores=True)

#----------------------------

# This is the google fact search tool API 
def googFactCheckSearch(query):

    api_key = settings.GOOGLE_FACTCHECK_API_KEY
    factcheck_url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"

    # the parameters for the model which include the text and my api_key
    params = {
        "query" : query,
        "key" : api_key,
    }

    # attempt to make a request to the API, if it fails it sends back the type of HTTP error or it will give a successful response
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
        return response.json()
    