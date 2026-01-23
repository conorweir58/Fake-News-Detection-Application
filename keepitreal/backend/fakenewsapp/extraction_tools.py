from unittest import case
from newspaper import Article
import requests
import os
from django.conf import settings
from decouple import config
from pypdf import PdfReader
from spire.doc import Document
from spire.presentation import Presentation

# Extracting article from url using newspaper3k
def extract_from_url(url):
    article = Article(url) # Article object composes newspaper object

    article.download() # Articles html content must be downloaded before being accessed
    article.parse() # Parses article html content into meaninful content

    return article # return entire Article object so content can be accessed as needed later

# Lets us use newspaper3k to extract article and use its nlp from raw text input
def extract_from_text(text):
    article = Article("") # Article object with empty url

    article.set_text(text) # Set the text of the article as inputted text

    return article

def extract_from_file(uploaded_file):
    article = Article("")

    # Hardcoded file path for testing
    #uploaded_file = "C:\\Users\\Conor\\DCU\\yr2\\sem2\\CSC1022\\CSC1022_CA1_2025_Group6.pdf"

    file_type = os.path.splitext(uploaded_file)[1].lower()

    if file_type == ".pdf":

        reader = PdfReader(uploaded_file)
        article.set_text("".join([page.extract_text() for page in reader.pages]))

    elif file_type in [".doc", ".docx", ".docm", ".dot", ".dotx", ".dotm"]:

        document = Document()
        document.LoadFromFile(uploaded_file)

        article.set_text(document.GetText())

        document.Close()

    elif file_type in [".ppt", ".pptx", ".pps", ".ppsx"]:

        presentation = Presentation()
        presentation.LoadFromFile(uploaded_file)

        


    print(article.text)

    # article.download_state = 2
    # article.is_parsed = True
    # article.nlp()

    # print("\nKeywords:", article.keywords)

    return article

# USING DOCXTRACT - NOT WORKING BECAUSE OF ISSUES WITH SENDING FILES TO API - MAY WORK WITHOUT HARDCODED FILES BUT FOR NOW GONNA TRY DIFFERENT LIBRARY
# def extract_from_file(uploaded_file):
#     article = Article("")

#     file_path = "C:\\Users\\Conor\\DCU\\yr1\\CA169 - N&I\\Notes\\The Internet.pptx"

#     url = "https://docxtract1.p.rapidapi.com/extract"

#     docxtract_key = config("X_RAPIDAPI_KEY_DOCXTRACT")

#     headers = {
#         "x-rapidapi-key": docxtract_key,
#         "x-rapidapi-host": "docxtract1.p.rapidapi.com",
#     }

#     with open(file_path, "rb") as f:
#         files = {
#             "file": (os.path.basename(file_path), f)
#         }

#         response = requests.post(url, headers=headers, files=files)

#     response.raise_for_status()
#     data = response.json()
#     print(data)

#     # article.set_text(response.json().get("text"))

#     # return article

#if __name__ == "__main__":

#    extract_from_file(None)