from django.urls import path
from . import views


urlpatterns = [
    path('analysis/', views.analyse),
    path('analysis/<int:id>/', views.get_analysis),
    path('extract/url/', views.extract_url),
    path('extract/file/', views.extract_file),
    path('login/', views.login_to_account),
    path('register/', views.register),
    path('logout/', views.account_logout),
    path('history/', views.history),
    path('csrf/', views.get_csrf),
    path('check-auth/', views.check_auth), # Endpoint for frontend to check if user is authenticated
]