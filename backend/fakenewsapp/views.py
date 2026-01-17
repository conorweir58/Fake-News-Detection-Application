from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
import requests
from requests.exceptions import HTTPError
from transformers import pipeline
from .detection_models import (pulk_pipe, sentiment_pipe, bias_pipe, gpt_pipe, googFactCheckSearch)

def analyse(request):
    text = "In yet another tone-deaf decision that ignores the needs of ordinary citizens, the City Council has rushed through an aggressive bike lane expansion plan that will punish hardworking commuters while catering to a small, vocal minority of cyclists. Framed as a “green initiative,” the proposal is little more than an ideological vanity project that prioritizes optics over practicality. According to city officials, the plan will remove two lanes of traffic from several major roads to make space for protected bike lanes. Supporters claim this will reduce congestion and improve air quality. However, anyone who actually drives these roads knows the reality: traffic is already unbearable, public transport is unreliable, and most residents depend on cars to get to work, school, and essential services. Removing lanes will only make daily commutes longer and more stressful. Despite repeated warnings from residents and small business owners, the council pushed the plan forward with minimal public consultation. Many locals feel the decision was made long before public meetings were held, turning community engagement into nothing more than a box-ticking exercise. Speakers who raised concerns about emergency vehicle access, delivery delays, and parking shortages were brushed aside, while pro-bike activists were given ample time to praise the proposal. The economic consequences of the plan are being conveniently ignored. Local shop owners along the affected routes are already struggling with rising rents and declining foot traffic. By removing parking spaces and slowing traffic, the city is effectively driving customers away. Council members insist that cyclists will replace car-driving shoppers, a claim that has little evidence to support it. Families running errands, elderly residents, and people with disabilities are far more likely to rely on cars than bicycles, yet their needs appear to be an afterthought."

    pulk_result = pulk_pipe(text)
    sentiment_result = sentiment_pipe(text)
    bias_result = bias_pipe(text)
    gpt_result = gpt_pipe(text)
    fact_check_result = googFactCheckSearch(text)

    return JsonResponse({
        "fake_news" : pulk_result,
        "sentiment" : sentiment_result,
        "bias" : bias_result,
        "AI_created" : gpt_result,
        "True or false" : fact_check_result,
    })
