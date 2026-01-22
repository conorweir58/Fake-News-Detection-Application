def computation(pulk_result, sentiment_result, bias_result, gpt_result):
    
    if pulk_result[0]['label'] == "FAKE":
        pulk_num = 1 - pulk_result[0]['score']
    else:
        pulk_num = pulk_result[0]['score']
    sentiment_num = 1 - sentiment_result[0]['score']
    bias_options = [item['score'] for item in bias_result[0]]
    bias_num = 1 - max(bias_options)
    if gpt_result[0]['label'] == "Human":
        gpt_num = gpt_result[0]['score']
    else:
        gpt_num = gpt_result[0]['score']

    pulk_weight = 0.4
    sentiment_weight = 0.2
    bias_weight = 0.25
    gpt_weight = 0.15

    overall = (pulk_num * pulk_weight) + (sentiment_num * sentiment_weight) + (bias_num * bias_weight) + (gpt_num * gpt_weight)

    print(overall)

    return overall