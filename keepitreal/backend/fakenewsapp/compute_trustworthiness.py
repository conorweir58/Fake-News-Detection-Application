def computation(api_models):

    if not api_models:
        return None

    pulk_weight = 0.4
    sentiment_weight = 0.2
    bias_weight = 0.25
    gpt_weight = 0.15

    combined_weight = 0
    pulk_weighted_score = 0
    sentiment_weighted_score = 0
    bias_weighted_score = 0
    gpt_weighted_score = 0

    for model, result in api_models.items():
        if model == "pulk":
            pulk_weighted_score = pulk_score(result) * pulk_weight
            combined_weight += pulk_weight
            print("Combined weight:", combined_weight)
        elif model == "sentiment":
            sentiment_weighted_score = sentiment_score(result) * sentiment_weight
            combined_weight += sentiment_weight
            print("Combined weight:", combined_weight)
        elif model == "bias":
            bias_weighted_score = bias_score(result) * bias_weight
            combined_weight += bias_weight
        elif model == "gpt":
            gpt_weighted_score = gpt_score(result) * gpt_weight
            combined_weight += gpt_weight
        else:
            return("Error: model not found")
        
    if combined_weight == 0:
        return None
    
    combined_scores = pulk_weighted_score + bias_weighted_score + sentiment_weighted_score + gpt_weighted_score

    if combined_scores == 0:
        return None

    print("Combined scores", combined_scores)

    overall = combined_scores / combined_weight

    print(overall)

    return overall


def pulk_score(pulk_result):
    score = pulk_result[0]['score']

    if not score:
        return None

    if pulk_result[0]['label'] == "FAKE":
        pulk_num = 1 - score
    else:
        pulk_num = score

    return pulk_num

def sentiment_score(sentiment_result):
    score = sentiment_result[0]['score']

    if not score:
        return None

    if score < 0.7:
        sentiment_num = 0.9
    else:
        sentiment_num = 1 - score

    return max(0.15, sentiment_num)

def bias_score(bias_result):
    bias_options = [item['score'] for item in bias_result[0]]

    if not bias_options:
        return None

    bias_num = 1 - max(bias_options)
    return bias_num

def gpt_score(gpt_result):
    score = gpt_result[0]['score']

    if not score:
        return None

    if gpt_result[0]['label'] == "Human":
        gpt_num = score
    else:
        gpt_num = 1 - score
        
    return gpt_num