from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import CustomUserManager

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(max_length=80, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email' # this makes it so the email field is used as the unique identifier for login instead of username
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    def __str__(self):
        return self.email




class DetectionResults(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.TextField()
    result = models.FloatField()
    pulk = models.JSONField()
    sentiment = models.JSONField()
    bias = models.JSONField()
    gpt = models.JSONField()
    created_at = models.DateField(auto_now_add=True)

    
# Create your models here.
