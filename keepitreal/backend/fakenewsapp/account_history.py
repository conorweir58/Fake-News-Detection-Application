from django.http import JsonResponse
from .models import User_History
from django.contrib.auth.decorators import login_required


def account_history(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Login Required to see past submissions"})

    items = (User_History.objects.filter(user=request.user).select_related("response"))

    if not items:
        return JsonResponse({"message": "User does not have any previous submissions"}, status=404)

    data = []

    for item in items:
        detection = item.response  # DetectionResults instance

        data.append({
            "id": item.id,
            "response": {
                "id": detection.id,
                "text": detection.text,
                "result": detection.result,
                "pulk": detection.pulk,
                "sentiment": detection.sentiment,
                "bias": detection.bias,
                "gpt": detection.gpt,
                "created_at": detection.created_at,
                "title": detection.title,
            }
        })

    if not data:
        return JsonResponse({"error": "Failed to add past submission objects"})

    return JsonResponse(data, safe=False)

@login_required
def delete_history(request, id):
    try:
        entry = User_History.objects.get(id=id, user=request.user)
        entry.delete()
        return JsonResponse({"message": "Item successfully deleted"})
    except User_History.DoesNotExist:
        return JsonResponse({"error":" Item not found in history"}, status=404)