from unittest import case
from newspaper import Article
import requests
import os
from django.conf import settings
from decouple import config
from pypdf import PdfReader
from spire.doc import Document
from spire.presentation import Presentation, IAutoShape
from markdown import markdown
from bs4 import BeautifulSoup

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
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr2\\sem2\\CSC1022\\CSC1022_CA1_2025_Group6.pdf" # pdf test
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr2\\sem2\\CSC1022\\CSC1022_CA1_2025_Group9.docx" # docx test
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr2\\sem2\\CSC1029\\wk05\\Psychology of Testing .pptx" # pptx test
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr3\\yr3_project\\2026-csc1049-bandrew-fakenewsdetection\\README.md"
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr3\\yr3_project\\testing_area\\testing_html_extract.html"
    uploaded_file = "C:\\Users\\Conor\\DCU\\yr3\\yr3_project\\testing_area\\testing_txt_extract.txt"

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

        sb = []
        
        # Loop through all slides and extract test to sb list - O(n^3) - maybe better way to do later? - quite slow
        # based on https://github.com/eiceblue/Spire.Presentation-for-Python/blob/main/Python%20Examples/02_ParagraphAndText/ExtractText.py
        for slide in presentation.Slides:
            for shape in slide.Shapes:
                if isinstance(shape, IAutoShape):
                    for tp in ( shape if isinstance(shape, IAutoShape) else None).TextFrame.Paragraphs:
                        sb.append (tp.Text)
        
        article.set_text("\n".join(sb))
        presentation.Dispose() # Releases all resources used by presentation object

    elif file_type in [".md", ".html", ".htm"]:

        with open(uploaded_file, "r", encoding="utf-8") as f:
            file_content = f.read()
        
        if file_type == ".md":
            file_content = markdown(file_content)
        
        soup = BeautifulSoup(file_content, "html.parser")
        article.set_text("".join(soup.find_all(string=True)))
        
    elif file_type == ".txt":

        with open(uploaded_file, "r", encoding="utf-8") as f:
            article.set_text(f.read())
        




    print(article.text)

    return article

if __name__ == "__main__":

    extract_from_file(None)