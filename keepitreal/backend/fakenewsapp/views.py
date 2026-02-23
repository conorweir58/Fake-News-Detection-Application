from django.contrib.auth import logout
from .analyse import complete_analysis
from rest_framework.decorators import api_view
from .models import DetectionResults
from .account_handler import register_account, account_login
from .account_history import account_history, delete_history
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ContactForm, User_History
from .serializers import ContactFormSerializer

# ANALYSIS VIEWS

# The main function for running the detection models

@api_view(['POST'])
def analyse(request):       

    final_results = complete_analysis(request)

    return final_results


@api_view(['GET'])
def get_analysis(request, id):
    analysis_result = DetectionResults.objects.get(id=id)

    if analysis_result is None:
        return JsonResponse({"error": "No analysis results found yet."}, status=401)

    return JsonResponse({"id": analysis_result.id, "result": analysis_result.result, "True or False": analysis_result.pulk, "bias": analysis_result.bias, "AI or Human": analysis_result.gpt, "Sentiment":analysis_result.sentiment})

def register(request):
    message = register_account(request)
    return message


def login_to_account(request):
    message = account_login(request)
    return message


def account_logout(request):
    logout(request)
    return JsonResponse({"message":"Logged out"})


@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({"message":"CSRF set"})


# Check if user is authenticated function for frontend
def check_auth(request):
    if request.user.is_authenticated:
        return JsonResponse({"authenticated": True, "email": request.user.email, "username": request.user.username})
    else:
        return JsonResponse({"authenticated": False}, status=401)


@api_view(['GET'])
def history(request):

    data = account_history(request)

    return data

def delete_his(request, id):
    data = delete_history(request, id)
    return data

def history_item(request, id):

    if request.method != "GET":
        return JsonResponse({"error": "GET request required"}, status=400)

    try:
        entry = User_History.objects.get(id=id, user=request.user)
    except User_History.DoesNotExist:
        return JsonResponse({"error": "Item not found in history"}, status=404)



    
    data = {
        "id": entry.response.id,
        "title": entry.response.title,
        "text": entry.response.text,
        "result": entry.response.result,
        "bias": entry.response.bias,
        "sentiment": entry.response.sentiment,
        "gpt": entry.response.gpt,
        "pulk": entry.response.pulk,
        "created_at": entry.response.created_at,
    }

    return JsonResponse(data, safe=False)

# from https://www.geeksforgeeks.org/python/build-a-contact-form-using-django-react-and-tailwind/
class SubmitContactFormView(APIView):
    def post(self, request, format=None):
        serializer = ContactFormSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Form submitted successfully!'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)