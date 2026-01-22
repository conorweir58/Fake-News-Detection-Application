from newspaper import Article
import requests
from django.conf import settings
from decouple import config
from pypdf import PdfReader

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

    article.parse()

    return article

def extract_from_file(uploaded_file):
    article = Article("")

    # Hardcoded file path for testing
    file_path = "C:\\Users\\Conor\\DCU\\yr1\\CA169 - N&I\\Notes\\The Internet.docx"

    reader = PdfReader(file_path)
    

    article.set_text()

    article.parse()

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

if __name__ == "__main__":

    extract_from_file(None)