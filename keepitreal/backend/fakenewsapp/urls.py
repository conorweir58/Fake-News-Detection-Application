from django.urls import path
from . import views


urlpatterns = [
    path('analysis/', views.analyse),
    path('analysis/<int:id>/', views.get_analysis),
    path('extract/url/', views.extract_url),
    path('extract/file/', views.extract_file),
    path('login/', views.login_to_account),
    path('register/', views.register),
    path('logout/', views.logout),
    path('csrf/', views.get_csrf),
]