# CSC1049 Year 3 Project Proposal Form

## Section A: Member and Supervisor Details

### Project Title: KeepItREAL

### Students

#### Student 1

- **Name:** Conor Weir
- **ID:** 23418374
- **Email:** [conor.weir5@mail.dcu.ie](mailto:conor.weir5@mail.dcu.ie)

#### Student 2

- **Name:** Andrew Brady
- **ID:** 23447126
- **Email:** [brady.andrew5@mail.dcu.ie](mailto:brady.andrew5@mail.dcu.ie)

### Staff Member Consulted

**Name:** Alessandra Mileo

## Section B: Project Description and Outline

### Description of Project

In the current world of politics and news, and the ease of submitting opinions and information to public news platforms, the pressence of inacurate, misleading and fake news has become a serious issue, swaying the public's opinions based on a manipulative narrative. KeepItReal is a proposed web-based application for assisting users in accurately browsing news online by helping detect fake and unreliable news and information.

The project provides an interface for users to upload news articles to be checked for accuracy of information and reliability using our frontend web application through the form of the url to the article. The frontend of the web application will be designed using React and the backend using Django, as well as maintaing a database of users and their previous uploads to the web app. The url from the frontend is then sent to our web applications backend where it is parsed, the article data (such as title, authors, publish date, article text, images, etc.) are extracted, and then analysed for this accuracy and reliability.

This analysis will include a number of metrics which will determine an overall "Trustworthiness", as well as a confidence in this answer. On top of this, each metric will provide a block of reasoning behind the answer, which will allow us to inform the user how we came to this conclusion on this article of news. These metrics include:

- A fact check analysis using a pretrained model (potentially to be finetuned by ourselves).
- A query of the "Google Fact Check Tools" API for similar articles related to the title, keywords or images present in the current article.
- A sentiment analysis to review if the author has taken a positive, neutral or negative view on the topic.
- A bias analysis to check the article for potential bias which could sway the reliability of the news piece.
- A comparison of the consistency of image location and text location.
- An emotional analysis of the article.

### Division of Work

### Programming Languages

For the implementation of this project, we decided to use the following programming languages:

- **Python:** Used for the backend logic with the Django framework. Also used for importing text extraction libraries and natural language processors and integrating with different analytical models and APIs used to conduct our analysis.
- **Javascript:** Used for building the frontend User Interface with the React framework - also handles user interaction and communication with API's in the backend.
- **HTML & CSS:** We will be using this to structure the webapp along with Tailwind CSS for design purposes.

### Programming Tools

We will be using tools, frameworks and libraries for development including:

#### Frontend Tools

- **React:** Used to handle the user interface and authentification.
- **Tailwind CSS:** CSS framework used for styling our webapp.

#### Backend Tools

- **Django:** Used for our backend functionality and user authentification.
- **PostgreSQL:** Database for storing user related information - Scalable with good performance.

#### Article/Image Extraction Tools

- **newspaper3k:** Python library from article and image scraping from urls (like requests and beautifulsoup libraries combined).
- **pypdf:** Python library from extracting articles of text from pdfs.
- **Docxtract:** API for extracting text from .doc/.docx, .ppt/.pptx, .md and .txt files.

#### Analysis Tools

- **Pulk17 Pretrained Fake News Detection Model:** Pretrained model which classifies articles of text as real or fake, with a confidence score.
- **Twinword Text Analysis Bundle:** API with multiple functionalities around analysing human text, such as Sentiment Analysis.
- **Google Fact Check Tools API:** Google API for querying manually fact checked articles.
- **Biaslyze:** Python library that conducts an analysis of text for bias using NLP models.
- **Hello-SimpleAI AI Detector Model:** Pretrained model for detecting Human vs. ChatGPT text with a confidence score.

#### Deployment Tools

- **Docker:** Used for containerisation and deployment of our webapp.

#### DevOps Tools

- **Git:** Version control for the project and allows for collaboration between students.

### Learning Challenges

1. Utilizing, testing and finetuning pretrained models.
2. Extracting content and metadata from different forms of media (including websites, pdfs, docs, etc.).
3. Ensuring efficient runtimes while managing all models, APIs and libraries used.
4. Merging the information gathered from analysis using all the different models, APIs and libraries.
5. Balancing the weight given to each analysis metric for optimum accuracy scores.
6. Integrating frontend information with the backend analysis tools.
7. Frontend design using Tailwind CSS.
8. Handling user information (such as logins) using our backend and PostgreSQL.

### Hardware/Software Platform

- **Hardware:** Any Computer with access to internet
- **Software:** Windows, Linux or macOS

### Special Hardware/Software Requirments

No special hardware/software requirments.
