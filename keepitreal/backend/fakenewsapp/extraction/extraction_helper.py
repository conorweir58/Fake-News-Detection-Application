from newspaper import Article
from pypdf import PdfReader
from spire.doc import Document
from spire.presentation import Presentation, IAutoShape
from markdown import markdown
from bs4 import BeautifulSoup

#
# In order to be able to perform NLP on an article object, the article must be downloaded and then parsed.
# Without a valid article URL, an article cannot be downloaded and therefore cannot be parsed or have nlp performed
# To try and have a uniform return type and to avail of newspaper3k's NLP - the source code provides some values and methods we can use to workaround
# We can manually alter some values to allow our non-url article object to be able to be nlp'd
#

# Converts extracted text into a newspaper4k Article object
def article_from_text(text):

    article = Article("https://user.upload") # Dummy url so it passes url check inside newspaper4k

    article.title = text.split("\n")[0] # In order to get the article summary - it requires a title - set first line as title - COULD THIS BE SLOW, CHECK IF THIS MEANS IT WILL GO THROUGH ALL TEXT TO SLICE
    article.text = text

    article.download_state = 2 # Set the download state as downloaded - allows us to parse
    article.is_parsed = True # set is parsed to true to allow nlp
    article.config.MAX_SUMMARY_SENT = 10 # Increase the maximum sentences of summary in the articles config before nlp - just gives better summary results

    article.nlp()

    return article

# FILE EXTRACTORS

def pdf_to_article(file):

    reader = PdfReader(file.file)
    return article_from_text("".join([page.extract_text() for page in reader.pages]))

def doc_to_article(file):

    document = Document()
    document.LoadFromFile(file)

    article = article_from_text(document.GetText())

    document.Close()

    return article

def ppt_to_article(file):

    presentation = Presentation()
    presentation.LoadFromFile(file)

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

    return article

def html_to_article(file, typ):

    with open(file, "r", encoding="utf-8") as f:
        file_content = f.read()

    # Convert markdown to html if needed
    if typ == ".md":
        file_content = markdown(file_content)

    # from https://gist.github.com/lorey/eb15a7f3338f959a78cc3661fbc255fe
    soup = BeautifulSoup(file_content, "html.parser")
    return article_from_text("\n".join(soup.find_all(string=True)))