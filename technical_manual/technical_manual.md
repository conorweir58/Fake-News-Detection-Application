# **KeepItREAL Technical Specification - CSC1049**

**Group Members:**

| **Student Name** | **Student ID** |
| ---------------- | -------------- |
| **Conor Weir** | **23418374** |
| **Andrew Brady** | **23447126** |

## **Table of Contents**

### 1\. Introduction

1.1 [Purpose](#11-overview)

1.2 [Scope](#12-scope)

1.3 [Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)

1.4 [References](#14-references)

1.5 [Overview](#15-overview)

### 2\. System Architecture

2.1 [System Context](#21-system-context)

2.2 [System Architecture](#22-system-architecture)

### 3\. High-Level Design

3.1 [Component and Data Flow Model](#31-component-and-data-flow-model)

### 4\. Problems and Resolution

4.1 [Tensor flow: tokens over max limit](#41-tensor-flow-tokens-over-max-limit)

4.2 [Circular Progress Bar](#42-circular-progress-bar)

4.3 [Increasing Progress Bar](#43-increasing-progress-bar)

4.4 [Newspaper3k](#44-newspaper3k)

4.5 [Spire Doc and Spire Powerpoint](#45-spire-doc-spire-powerpoint)

### 5\. Installation Guide

5.1 [Prerequisite](#51-prerequisite)

5.2 [Manual Installation Instructions](#52-manual-install-instructions)

# 1\. Introduction

## 1.1 Purpose

The following technical specification document presents a detailed description of the initial and current design of the KeepItREAL web application. This outlines the architecture, functionalities and design for KeepItREAL.

## 1.2 Scope

This technical specification establishes the design and implementation created throughout the development of the KeepItREAL web application. Throughout this specification, we will cover:

- System Context/Overview
- System Architecture
- System Component Modeling (maybe)
- High-Level Design
- Problems Encountered and Their Resolutions
- Installation Guide

## 1.3 Definitions, Acronyms, and Abbreviations

For the remainder of the document, the KeepItREAL web application will simply be referred to as the web application/web app unless specified otherwise.

- **CORS - Cross-Origin Resource Sharing:** CORS is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

- **Vite:** A build tool for React that aims to provide a faster and leaner development experience for modern web projects.

- **HMR - Hot Module Replacement:** A technique for updating modules in your app without needing to reload the page.

## 1.4 References

- [Django-React Software Architecture - Mahdia Aliyya (Medium)](https://mahdiaaliyya.medium.com/software-architecture-bb44325bf0cf)

- https://www.geeksforgeeks.org/blogs/why-choose-react-for-web-development/

- https://vite.dev/guide/

- https://reactrouter.com/explanation/hot-module-replacement

## 1.5 Overview

KeepItREAL is a web application that aids users with navigating the complexities of news browsing, avoiding bias opinions, lies and other forms of false information that exists within the world of online news.

KeepItREAL provides an interface for users to upload news articles to be analysed using detection methods and evaluation metrics (which will be spoken of in detail in this document). KeepItREAL provides multiple methods of news article submission to users, to cover the primary forms of news users will come across.

These methods of submission are:

- URL
- Raw Text
- .docx files
- .pptx files
- .html/.htm files
- .md files
- .txt files

These submissions are then analysed by the our application on four current metrics:

- Bias Analysis
- Sentiment Analysis
- AI Generated Content Analysis
- An Overall Fake News Analysis

This analysis determines a “trustworthiness score” for the submitted piece of news. Using the formula we curated, we weigh the results of these analysis' to get this final score.

As a part of the results, an explanation to the results is included as well, to provide context behind the results returned.

The appliaction also provides a user account system to save previous submissions and resulting analysis’ in a history, allowing them to be accessed at any time.

The KeepItREAL application is not just a “True or False” fake news analysis system and instead provides valuable information to allow users to form an individual opinion on the news they digest.

### 2\. System Architecture

## 2.1 System Context

In figure 2.1.1, we see at a very basic and high-level view how the KeepItREAL system operates to achieve the goal of our system, including how our system interacts with external nodes in the context of the system.

This diagram does not include all information on the relationships and nodes in the system (which will be explained later) but but explains an overview of how the system works. For simplicity, this diagram hides all internal system functionality.

![Figure 2.1.1 - System Context Diagram](imgs/system_context.png)
**Figure 2.1.1** *System Context Diagram showcasing a high-level view of the KeepItREAL system in the basic context of how the system works and interacts with external actors.*

## 2.2 System Architecture

### 2.2.1 Architecture Overview

The System Architecture diagram (seen below in figure 2.2.1.1) displays the architectural structure of the KeepItREAL web application, following a classic React-Django structure using the Django REST Framework and Vite, as well as a PostgreSQL Database.

The services which make up the frontend and backend in the diagram are not the exact/all of the services in these areas and, for the purpose of readability, multiple services may be represented as one service in the diagram, however this will be discussed more in the following sectioms.

![Figure 2.2.1.1 - System Architecture Diagram](imgs/system_arch.png)
**Figure 2.1.1.1** *System Architecture Diagram displaying how external components and the internal frontend, backend and database are structured and interact with each other. A key is provided on the right-side of the diagram.*

### 2.2.2 The Frontend (VITE REACT (JS)) Architecture

The frontend layer of the web application was implemented using ReactJS for creating a dynamic and fast-to-build capabilities due to its component-based approach and virtual DOM. React's component-based approach also allowed us to follow the SPA (Single-page application) approach, allowing us to organise a modular and maintainable codebase with an easy-to-scale final application.

This was all improved by the use of Vite, allowing for fast HMR (Hot Module Replacement) and using Vite's build command that bundles code with Rollup to speed up development.

The UI elements of the frontend were designed largely using TailwindCSS, allowing for complete freedom of design with our UI while simplifying the CSS styling process. Tailwind also allowed us to create a responsive application by creating UI alterations based on screen size and differences in light/dark mode, creating an accessable web application with differences in users.

The structure of our frontend codebase (where the frontend system services seen in figure 2.2.1.1 are located) is as follows:

- assets
- components
  - account_managemnt
  - contact
  - history
  - results
  - submission
- contexts
- pages
  - error
  - layout
  - loading
- styling

Users communicate with the frontend application through HTTP requests (with future plans of converting to HTTPS with deployment), which are validated.

The frontend communicates with the backend application using REST Api Calls to Get, Post, Put or Delete Data.

### 2.2.3 The Backend (DJANGO + REST) Architecture

The backend layer of the web application was built using Django and the Django REST Framework, using CSRF protection and structured API endpoints for the frontend to communicate with our backend. All backend functionality goes through the endpoint "api" in the frontend. Our models include Detection Results which creates objects of submission, user use our custom user model. The User_History model stores all previous submissions for users to access them.

### 2.2.4 PostgreSQL Database

A PostgreSQL Database was used for our data storage. It provides strict data integrity and
was chosen with scalability and extensability in mind. With the flexibility it brings, it reduces long-term risk for the maintainability and extension of the web application in the future, allowing for added capabilities without switching platforms.

### 2.2.5 External Tools

With the time constraints of the delivery of this project, we used existing pre-trained models to conduct our analysis methods.

#### 2.2.5.1 Pulk-17 Fake News Model

The model can be found here: [Pulk-17 Fake News Model](https://huggingface.co/Pulk17/Fake-News-Detection).

Returns a label for "REAL" or "FAKE" and a confidence score in this label.

#### 2.2.5.2 Hello SimpleAI ChatGPT Model

The model can be found here: [Hello SimpleAI ChatGPT Model](https://huggingface.co/spaces/Hello-SimpleAI/chatgpt-detector-qa).

Returns a label for "HUMAN" or "AI" and a confidence score in this label.

#### 2.2.5.3 Mervp Sentiment Model

The model can be found here: [Mervp Sentiment Model](https://huggingface.co/mervp/SentimentBERT).

Returns a label for "Positive" or "Negative" or "Neutral" and a confidence score in this label.

#### 2.2.5.4 Cirimus Bias Model

The model can be found here: [Cirimus Bias Model](https://huggingface.co/cirimus/modernbert-large-bias-type-classifier).

Returns a list of labels containing many different bias types and a confidence score related to each label.

### 3\. High-Level Design

### 3.1 Component and Data Flow Model

The following Component Model below (figure 3.1.1) outlines the system design at a semi heigh-level, including the system components and the relationship between these components and the system enviornment.

This component model also shows the flow of data through the relationships established in the system.

Some components represent multiple areas of code in the system, e.g. Presentation Components represent all UI components a user interacts with.

![Figure 3.1.1 - Component and DFD Model](imgs/component.png)
**Figure 3.1.1** *Component Model displaying the main components used in the design of the KeepItREAL web application, and how Data Flows through these primary components.*

### 4\. Problems and Resolution

### 4.1 Tensor flow: tokens over max limit

#### Problem

When calling the external hugging face models they had a different amount of max tokens they could accept. This meant that we would sometimes encounter a tensor flow error stating we had e.g. 3172 tokens and the max limit was 512.

#### Solution

We did some research and found that each model has an AutoTokenizer we could call through the transformers and set the max we send to be 512 tokens to stop the error from arising. We set this for three models because that was there max. For the other model the max was 8192 but that would take too long to run but we still gave it 1024 so it had more information to run to get a more accurate result.

### 4.2 Circular Progress Bar

#### Problem

The circular progress bar was an idea to include in the breakdown of results for each model. However we encountered many issues with this due to things such as misalignment caused by the circle having to be flipped so the progress bar started from the top of the circle.

#### Solution

We realised that in terms of cohesion with the project it did not really fit and was not very modular so we decided to make them flat progress bars aligning closer with the rest of our results page.

### 4.3 Increasing Progress Bar

#### Problem

So one issue that arose was for our main trustworthiness progress bar we had it working except for the fact that when the page loaded it was already at the point at which it stops. It turned out it was never moving in the first place.

#### Solution

The solution we found was to create a move function that would increase the width of the bar gradually. This created a very smooth bar transition to show it growing.

### 4.4 Newspaper3k

#### Problem

One of our text extraction tools was newspaper3k in the early stages of development. One day it stopped working and we did not know exactly what was causing the issue.

#### Solution

During the course of our project the newspaper3k library was deprecated and no longer usable because they had updated to newspaper4k. This involved implementing the new library and changing all the functions based off the new documentation

### 4.5 Spire-doc Spire-powerpoint

#### Problem

The django file stream that takes in user files is not compatable with the file stream needed for Spire doc.

#### Solution

We had to find a lower level library and create our own functions to extract the metadata from the supported file types. This ended up leading to a more efficient solution.

### 5\. Installation Guide

#### 5.1 Prerequisite

- Software Requirements
  - Python 3.10 or newer
  - git
  - Node.js
  - npm
  - Any form of Modern Browser (tested on Chrome, FireFox)

- Hardware Requirements
  - Windows 10 or Windows 11 Machine
  - 5GB of free disk space
  - Stable Internet Connection

#### 5.2 Manual Install Instructions

1. Check all the prerequisite version

```bash
- node -v
- npm -v
- python -v
- git -v 
```

2. Clone our project repository into a folder

```bash
git clone https://gitlab.computing.dcu.ie/andrewb5/2026-csc1049-bandrew-fakenewsdetection.git
cd 2026-csc1049-bandrew-fakenewsdetection
```

3. Install requirements.txt

```bash
pip install -r keepitreal\backend\requirements.txt
```

4. Install frontend requirements

```bash
cd ..\..\keepitreal\frontend\
npm install
```

5. Create an .env file in the backend directory and add these

```bash
SECRET_KEY='REMOVED'
GOOGLE_FACTCHECK_API_KEY='REMOVED'
PULK17_HF_KEY='REMOVED'
X_RAPIDAPI_KEY_DOCXTRACT='REMOVED'
DEBUG=True
```

6. If you do not want to install PostgreSQL simply:
```bash
Open the settings.py file into your chosen editor
change the block of code:
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': 'FakenewsDatabase',
    'USER': user,
    'PASSWORD': password,
    'HOST': '127.0.0.1',
    'PORT': '5432',
  }
}
```

with this block:
```bash
DATABASES = {
  'default': {
      'ENGINE': 'django.db.backends.sqlite3',
      'NAME': BASE_DIR / 'db.sqlite3',
  }
}
```

7. Run database migrations

```bash
cd ..\..\keepitreal\backend
python manage.py makemigrations
python manage.py migrate
```

8. Start backend server

```bash
python manage.py runserver
```

9. Open another termninal to run frontend

```bash
cd keepitreal\frontend
npm run dev
```

10. Once frontend server is started copy the link shown beside local: and paste that into your browser

# 6\. References
- https://realpython.com/python-requests/
- https://www.geeksforgeeks.org/git/git-ignore-and-gitignore/
- https://www.codegenes.net/blog/pytorch-git/
- https://www.geeksforgeeks.org/python/best-practices-for-managing-django-secret-keys-and-environment-variables/
- https://www.roomacarthur.dev/notes/how-to-using-python-decouple-for-environment-variables-in-django/
- https://pytorch.org/get-started/locally/
- https://huggingface.co/transformers/v3.2.0/main_classes/configuration.html
- https://huggingface.co/blog/sentiment-analysis-python
- https://huggingface.co/cirimus/modernbert-large-bias-type-classifier
- https://www.geeksforgeeks.org/blogs/how-to-build-an-api-from-scratch/
- https://www.django-rest-framework.org/api-guide/views/
- https://vite.dev/guide/
- https://stackoverflow.com/questions/70612439/csrf-failed-origin-checking-failed-http-localhost8000-does-not-match-any
- https://codezup.com/building-custom-authentication-system-django-step-by-step-guide/
- https://codebrahma.com/react-csrf-protection-10-best-practices/
- https://www.stackhawk.com/blog/react-csrf-protection-guide-examples-and-how-to-enable-it/#h-how-to-fix-the-csrf-vulnerability
- https://www.cybersrely.com/5-ways-for-csrf-prevention-in-react-js/#How_to_Implement_CSRF_Prevention_in_Reactjs
- https://newspaper4k.readthedocs.io/en/latest/
- https://www.enterprisedb.com/postgresql-tutorial-resources-training-1?uuid=867f9c7f-7be7-44ed-b03f-103a0a430d51&campaignId=postgres_rc_18
- https://stackoverflow.com/questions/73377958/is-there-a-way-to-store-class-instances-into-a-database-python
- https://alvarotrigo.com/blog/progress-bar-css/
- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_progressbar_3
- https://www.w3schools.com/tags/ref_httpmethods.asp
- https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
- https://www.freecodecamp.org/news/how-to-use-postgresql-in-django/
- https://docs.djangoproject.com/en/6.0/topics/db/models/
- https://www.geeksforgeeks.org/python/serializers-django-rest-framework/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
- https://www.w3schools.com/colors/colors_picker.asp
- https://css-tip.com/progress-bar-dynamic-color/
- https://stackoverflow.com/questions/3736964/django-query-using-order-by-and-latest
- https://docs.djangoproject.com/en/6.0/ref/contrib/auth/#django.contrib.auth.models.User
- https://www.geeksforgeeks.org/blogs/how-to-build-an-api-from-scratch/
- https://docs.pytorch.org/docs/stable/index.html
- https://www.django-rest-framework.org/api-guide/views/
- https://www.w3schools.com/python/python_json.asp
- https://www.freecodecamp.org/news/how-to-enable-cors-in-django/
- https://www.sqlpey.com/python/resolved-how-to-fix-django-csrf-cookie-not-set-issue/
- https://www.geeksforgeeks.org/python/django-orm-inserting-updating-deleting-data/
- https://docs.djangoproject.com/en/6.0/topics/db/models/
- https://docs.djangoproject.com/en/6.0/topics/auth/default/
- https://www.geeksforgeeks.org/python/user-authentication-system-using-django/
- https://docs.djangoproject.com/en/dev/ref/csrf/
- https://docs.djangoproject.com/en/6.0/howto/csrf/
- https://medium.com/django-unleashed/complete-tutorial-set-up-postgresql-database-with-django-application-d9e789ffa384
- https://dev.to/udoka_emmanuel/how-to-build-a-navigation-bar-in-react-a-step-by-step-guide-2pcp
- https://stackoverflow.com/questions/76449710/how-to-make-background-color-transition-gradually-into-another-color
- https://css-tricks.com/building-progress-ring-quickly/
- https://sqlpey.com/python/solved-how-to-fix-django-object-is-not-json-serializable/
- https://stackoverflow.com/questions/33230540/django-select-related-when-to-use-it
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
- https://betterstack.com/community/guides/scaling-python/error-handling-django/
- https://python.plainenglish.io/integrating-django-with-external-apis-best-practices-for-seamless-connections-dd8fca5ad9c0
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/linear-gradient
- https://codepen.io/alvarotrigo/pen/abLvEjW
- https://www.w3tutorials.net/blog/how-to-create-a-circular-style-progressbar/#google_vignette
- http://w3tutorials.net
- https://mui.com/material-ui/react-progress/
- https://www.geeksforgeeks.org/css/how-to-create-circular-progress-bar-using-svg/
- https://www.joshwcomeau.com/svg/friendly-introduction-to-svg/
- https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
- https://www.geeksforgeeks.org/machine-learning/weight-optimization/
- https://fontawesomeicons.com/fa/react-js-round-two-decimal-places
- https://www.geeksforgeeks.org/reactjs/how-to-handle-errors-in-react/
- https://www.geeksforgeeks.org/reactjs/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/
- https://www.xjavascript.com/blog/access-javascript-nested-objects-safely/#google_vignette
- https://www.geeksforgeeks.org/blogs/10-most-common-http-status-codes/
- https://stackoverflow.com/questions/39523040/concatenating-variables-and-strings-in-react
- https://www.geeksforgeeks.org/reactjs/how-to-get-first-n-number-of-elements-from-an-array-using-reactjs/
- https://tailwindcss.com/docs/
- https://www.jamesmcguigan.com/content/llm/generative_ai/huggingface/transformers/AutoTokenizer.html
- https://docs.djangoproject.com/en/6.0/topics/testing/overview/
- https://www.django-rest-framework.org/api-guide/testing/

- Here are two citations requested by two of our APIs
  - Our Bias Model API
  @inproceedings{JunquedeFortuny2025c,
    title = {Bias Detection with ModernBERT-Large},
    author = {Enric Junqué de Fortuny},
    year = {2025},
    howpublished = {\url{https://huggingface.co/cirimus/modernbert-large-bias-type-classifier}},
  }
  - Our AI vs Human Model API
  @article{guo-etal-2023-hc3,
    title = "How Close is ChatGPT to Human Experts? Comparison Corpus, Evaluation, and Detection",
    author = "Guo, Biyang  and
      Zhang, Xin  and
      Wang, Ziyuan  and
      Jiang, Minqi  and
      Nie, Jinran  and
      Ding, Yuxuan  and
      Yue, Jianwei  and
      Wu, Yupeng",
    journal={arXiv preprint arxiv:2301.07597}
    year = "2023",
  }


