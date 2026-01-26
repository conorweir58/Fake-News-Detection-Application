# THIS CODE NEEDS CLEAN UP - POTENTIALLY MOVE SOME THINGS TO ANOTHER UTIL FILE
# HTML EXTRACTION NEEDS TO REMOVE THE 'html' IDENTIFIER BEFORE THE TEXT
# HTML EXTRACTION MAY ALSO NEED TO ALTER HOW IT IS SEPERATED

from unittest import case
from newspaper import Article
import os
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

#
# In order to be able to perform NLP on an article object, the article must be downloaded and then parsed.
# Without a valid article URL, an article cannot be downloaded and therefore cannot be parsed or have nlp performed
# To try and have a uniform return type and to avail of newspaper3k's NLP - the source code provides some values and methods we can use to workaround
# We can manually alter some values to allow our non-url article object to be able to be nlp'd
#

# Converts extracted text into a newspaper3k Article object
def article_from_text(text):

    article = Article("https://user.upload") # Dummy url so it passes url check inside newspaper3k

    article.set_title(text.split("\n")[0]) # In order to get the article summary - it requires a title - set first line as title - COULD THIS BE SLOW, CHECK IF THIS MEANS IT WILL GO THROUGH ALL TEXT TO SLICE
    article.set_text(text)

    article.download_state = 2 # Set the download state as downloaded - allows us to parse
    article.is_parsed = True # set is parsed to true to allow nlp

    article.nlp()

    return article

# Lets us use newspaper3k to extract article and use its nlp from raw text input
def extract_from_text(text):

    return article_from_text(text) # just return the article set to the given text

def extract_from_file(uploaded_file):

    # Hardcoded file paths for testing
    uploaded_file = "C:\\Users\\Conor\\DCU\\yr2\\sem2\\CSC1022\\CSC1022_CA1_2025_Group6.pdf" # pdf test
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr2\\sem2\\CSC1022\\CSC1022_CA1_2025_Group9.docx" # docx test
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr2\\sem2\\CSC1029\\wk05\\Psychology of Testing .pptx" # pptx test
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr3\\yr3_project\\2026-csc1049-bandrew-fakenewsdetection\\README.md"
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr3\\yr3_project\\testing_area\\testing_html_extract.html"
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr3\\yr3_project\\testing_area\\test_html.htm"
    # uploaded_file = "C:\\Users\\Conor\\DCU\\yr3\\yr3_project\\testing_area\\testing_txt_extract.txt"

    file_type = os.path.splitext(uploaded_file)[1].lower()

    if file_type == ".pdf":

        reader = PdfReader(uploaded_file)
        article = article_from_text("".join([page.extract_text() for page in reader.pages]))

    elif file_type in [".doc", ".docx", ".docm", ".dot", ".dotx", ".dotm"]:

        document = Document()
        document.LoadFromFile(uploaded_file)

        article = article_from_text(document.GetText())

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
        
        article = article_from_text("\n".join(sb))
        presentation.Dispose() # Releases all resources used by presentation object

    elif file_type in [".md", ".html", ".htm"]:

        with open(uploaded_file, "r", encoding="utf-8") as f:
            file_content = f.read()
        
        if file_type == ".md":
            file_content = markdown(file_content)

        # from https://gist.github.com/lorey/eb15a7f3338f959a78cc3661fbc255fe
        soup = BeautifulSoup(file_content, "html.parser")
        article = article_from_text("\n".join(soup.find_all(string=True)))

    elif file_type == ".txt":

        # adapted from https://www.geeksforgeeks.org/pandas/read-html-file-in-python-using-pandas/
        with open(uploaded_file, "r", encoding="utf-8") as f:
            article = article_from_text(f.read())
    else:
        raise ValueError("Unsupported file type: " + file_type)

    return article

if __name__ == "__main__":

    article = extract_from_file(None)

    print(article.text)
    print(article.summary)
    print(article.keywords)
    print("-----------------------")

    print(article.title)
    print(article.authors)
    print(article.publish_date)

