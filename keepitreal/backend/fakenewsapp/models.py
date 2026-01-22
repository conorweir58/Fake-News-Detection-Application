from django.db import models

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
