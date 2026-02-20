# from https://www.geeksforgeeks.org/python/build-a-contact-form-using-django-react-and-tailwind/
from rest_framework import serializers
from .models import ContactForm

class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = ['name', 'email', 'subject', 'message']