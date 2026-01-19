from django.http import JsonResponse
from .detection_models import (pulk_pipe, sentiment_pipe, bias_pipe, gpt_pipe, googFactCheckSearch)
from .compute_trustworthiness import computation

# The main function for running the detection models
def analyse(request):

    #For now i just have the text hardcoded while i test the models 
    text = "A Dublin‑based climate‑tech startup, TideSignal, has announced a major breakthrough in early‑warning systems for coastal flooding, unveiling an AI model capable of predicting high‑risk surge events up to five days earlier than current national systems. The company, founded in 2023 by a team of oceanographers and machine‑learning engineers, says the technology could transform how coastal communities prepare for extreme weather. Ireland has experienced a rise in severe storm surges over the past decade, with local councils repeatedly calling for more accurate forecasting tools. “Our model ingests satellite data, tidal patterns, atmospheric pressure changes, and historical surge events,” said TideSignal CEO Maeve O’Donnell during a press briefing at the Docklands Innovation Hub. “The system doesn’t just forecast water levels — it identifies risk windows before they form.” Early trials conducted in partnership with the Marine Institute showed a 92% accuracy rate in predicting surge‑related flooding along the west coast. Local authorities in Galway and Clare have already expressed interest in piloting the system during the upcoming storm season."

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
