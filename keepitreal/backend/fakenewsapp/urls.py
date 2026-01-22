from django.urls import path
from . import views


urlpatterns = [
    path('analysis/', views.analyse),
    path('analysis/<int:id>/', views.get_analysis),
]

