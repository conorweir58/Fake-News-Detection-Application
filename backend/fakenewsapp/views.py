from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
import requests
from requests.exceptions import HTTPError
from transformers import pipeline

def googFactCheckSearch(request):

    query = "Muhammad Ali killed George Floyd"
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
        return JsonResponse(response.json())
    
def pulkDetector(request):
    HF_Key = settings.PULK17_HF_KEY
    pipe = pipeline("text-classification", model="Andrewbrady27/Fake-News-Pulk17", token=HF_Key)
    text = "Barack Obama recently went on a jet ski when visiting mike tysons mansion"

    try:
        result = pipe(text)
        return JsonResponse({"result": result})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def gptDetector(request):
    text = "Failure is often viewed as something to be avoided at all costs. From an early age, people are taught to strive for success, earn high grades, secure stable careers, and meet societal expectations. In this mindset, failure is associated with weakness, disappointment, or lack of ability. However, this perception overlooks one of the most important truths about human development: failure is not only inevitable, but essential for personal growth. Without failure, individuals miss valuable opportunities to learn, adapt, and build resilience. Rather than being an endpoint, failure is a powerful teacher that shapes character and strengthens determination. One of the most significant benefits of failure is the lesson it provides. Success often tells us what we did right, but failure reveals what we did wrong. When a person fails an exam, loses a competition, or makes a poor decision, they are forced to reflect on their actions. This reflection encourages critical thinking and self-awareness. For example, a student who performs poorly on a test may realize they need to change their study habits, manage time better, or ask for help. These insights rarely come from success alone. Failure exposes weaknesses that would otherwise remain hidden, allowing individuals to address them directly. Failure also plays a crucial role in developing resilience. Life is unpredictable, and challenges are unavoidable. People who have never experienced failure often struggle to cope when difficulties arise. In contrast, those who have faced setbacks learn how to recover, adapt, and keep moving forward. Each failure builds emotional strength, teaching individuals that disappointment is temporary and survivable. Over time, this resilience becomes a valuable asset, enabling people to face future challenges with confidence rather than fear. The ability to bounce back is often more important than talent or intelligence in achieving long-term success."
    pipe = pipeline("text-classification", model="Hello-SimpleAI/chatgpt-detector-roberta")
    text = "Barack Obama recently went on a jet ski when visiting mike tysons mansion"

    try:
        result = pipe(text)
        return JsonResponse({"result": result})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

