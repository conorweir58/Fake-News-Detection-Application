from django.urls import path
from . import views


urlpatterns = [
    path('factcheck/', views.googFactCheckSearch),
    path('pulk17/', views.pulkDetector),
    path('gptDet/', views.gptDetector),
]

