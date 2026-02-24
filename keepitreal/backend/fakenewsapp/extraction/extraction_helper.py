from newspaper import Article
from pypdf import PdfReader
from docx import Document
from pptx import Presentation
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

def pdf_to_text(file):

    reader = PdfReader(file)
    return "".join([page.extract_text() for page in reader.pages])

# Will no longer work for anything other than .docx files (i.e. word doc file older than 2007)
def doc_to_text(file):

    document = Document(file) # not sure if for security or for potential error pervention if somehting must be done with file before giving to Document

    text = "\n".join([para.text for para in document.paragraphs]) # https://python-docx.readthedocs.io/en/latest/api/text.html#docx.text.paragraph.Paragraph.text

    return text

def ppt_to_text(file):

    ppt = Presentation(file)
    
    # based on https://python-pptx.readthedocs.io/en/latest/user/quickstart.html#extract-all-text-from-slides-in-presentation and https://github.com/eiceblue/Spire.Presentation-for-Python/blob/main/Python%20Examples/02_ParagraphAndText/ExtractText.py
    content = []

    # Seems to be faster than Spire's ppt extraction but has worse time complex at O(n^4)
    for slide in ppt.slides:
        for shape in slide.shapes:
            if not shape.has_text_frame:
                continue
            for pg in shape.text_frame.paragraphs:
                for run in pg.runs:
                    content.append(run.text)
    
    text = "\n".join(content)
    return text

def html_to_text(file, type):

    raw = file.read() # think django InMemoryUploadedFile object would handles closing itself
    file_content = raw.decode("utf-8", errors="replace")

    # Convert markdown to html if needed
    if type == ".md":
        file_content = markdown(file_content)

    # from https://gist.github.com/lorey/eb15a7f3338f959a78cc3661fbc255fe
    soup = BeautifulSoup(file_content, "html.parser")

    # based on https://www.scrapingbee.com/blog/parsel-python/
    for tag in soup(["script", "style", "nav", "footer", "header", "aside", "noscript"]):
        tag.decompose()

    # print(soup.get_text(separator=" ", strip=True))

    return soup.get_text(separator=" ", strip=True) # potentially alter so that h1 tag becomes title or somehting
