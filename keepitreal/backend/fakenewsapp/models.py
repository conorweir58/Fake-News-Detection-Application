# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(max_length=80, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email' # this makes it so the email field is used as the unique identifier for login instead of username
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    def __str__(self):
        return self.email

class DetectionResults(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    text = models.TextField()
    result = models.FloatField()
    pulk = models.JSONField(null=True, blank=True)
    sentiment = models.JSONField(null=True, blank=True)
    bias = models.JSONField(null=True, blank=True)
    gpt = models.JSONField(null=True, blank=True)
    title = models.CharField(null=True, blank=True)
    created_at = models.DateField(auto_now_add=True)

class User_History(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    response = models.ForeignKey(DetectionResults, on_delete=models.CASCADE)

# based on https://www.geeksforgeeks.org/python/build-a-contact-form-using-django-react-and-tailwind/
class ContactForm(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return self.name