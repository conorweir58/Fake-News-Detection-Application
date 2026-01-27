# HTML EXTRACTION NEEDS TO REMOVE THE 'html' IDENTIFIER BEFORE THE TEXT
# HTML EXTRACTION MAY ALSO NEED TO ALTER HOW IT IS SEPERATED

from unittest import case
from newspaper import Article
import os
from .extraction_helper import *

# Extracting article from url using newspaper4k
def extract_from_url(url):
    article = Article(url) # Article object composes newspaper object

    article.download() # Articles html content must be downloaded before being accessed
    article.parse() # Parses article html content into meaninful content

    article.config.MAX_SUMMARY_SENT = 10 # Increase the maximum sentences of summary in the articles config before nlp - just gives better summary results

    article.nlp() # Performs nlp on article to extract keywords, summary, etc.

    return article # return entire Article object so content can be accessed as needed later

# Lets us use newspaper4k to extract article and use its nlp from raw text input
def extract_from_text(text):

    return article_from_text(text) # just return the article set to the given text

def extract_from_file(uploaded_file):

    file_type = os.path.splitext(uploaded_file.name)[1].lower()

    if file_type == ".pdf":
        text = pdf_to_text(uploaded_file)
    
    elif file_type in [".doc", ".docx", ".docm", ".dot", ".dotx", ".dotm"]:
        text = doc_to_text(uploaded_file)
    
    elif file_type in [".ppt", ".pptx", ".pps", ".ppsx"]:
        text = ppt_to_text(uploaded_file)
    
    elif file_type in [".md", ".html", ".htm"]:
        text = html_to_text(uploaded_file, file_type)

    elif file_type == ".txt":
        # adapted from https://www.geeksforgeeks.org/pandas/read-html-file-in-python-using-pandas/
        with open(uploaded_file, "r", encoding="utf-8") as f:
            text = f.read()

    else:
        raise ValueError("Unsupported file type: " + file_type)

    if text:
        return article_from_text(text)
    else:
        raise ValueError("No text could be extracted from the file.")