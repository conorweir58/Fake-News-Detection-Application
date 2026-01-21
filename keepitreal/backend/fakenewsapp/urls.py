from django.urls import path
from . import views


urlpatterns = [
    path('analysis/', views.analyse),
    path('extract/url/', views.extract_url),
    path('extract/file/', views.extract_file),
]

