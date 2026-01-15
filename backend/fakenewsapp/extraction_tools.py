from newspaper import Article
import requests

# Extracting article from url using newspaper3k
def extract_from_url(url):
    article = Article(url) # Article object composes newspaper object

    article.download() # Articles html content must be downloaded before being accessed
    article.parse() # Parses article html content into meaninful content

    return article # return entire Article object so content can be accessed as needed later

# Lets us use newspaper3k to extract article and use its nlp from raw text input
def extract_from_text(text):
    article = Article()

    article.set_text(text) # Set the text of the article as inputted text

    article.parse()

    return article


# TO DO: TAKE IN FILE INPUT AND SET AS CONTENT TO BE SENT TO API
def extract_from_file():
    article = Article()

    url = "https://docxtract1.p.rapidapi.com/extract"

    payload = {}
    headers = {
        "x-rapidapi-key": "REMOVED",
        "x-rapidapi-host": "docxtract1.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = requests.post(url, data=payload, headers=headers)

    article.set_text(response.json().get("text"))