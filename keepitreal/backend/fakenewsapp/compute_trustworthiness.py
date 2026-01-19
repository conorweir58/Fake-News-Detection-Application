def computation(pulk_result, sentiment_result, bias_result, gpt_result):
    pulk_num = 1 - pulk_result
    sentiment_num = 1 - sentiment_result
    bias_num = 1 - max(bias_result)
    gpt_num = 1 - gpt_result

    pulk_weight = 0.35
    sentiment_weight = 0.15
    bias_weight = 0.3
    gpt_weight = 0.2

    overall = (pulk_num * pulk_weight) + (sentiment_num * sentiment_weight) + (bias_num * bias_weight) + (gpt_num * gpt_weight)

    return overall