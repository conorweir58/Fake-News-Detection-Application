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

The project provides an interface for users to upload news articles to be checked for accuracy of information and reliability using our frontend web application through the form of the url to the article. The frontend of the web application will be design using React and the backend using Django, as well as maintaing a database of users and their previous uploads to the web app. The url from the frontend is then sent to our web applications backend where it is parsed, the article data (such as title, authors, publish date, article text, images, etc.) are extracted, and then analysed for this accuracy and reliability.

This analysis will include a number of metrics which will determine an overall "True or False" answer, as well as a confidence in this answer. On top of this, each metric will provide a block of reasoning behind the answer, which will allow us to inform the user how we came to this conclusion on this article of news. These metrics include:

- A fact check analysis using a pretrained model (potentially to be finetuned by ourselves).
- A query of the "Google Fact Check Tools" API for similar articles related to the title, keywords or images present in the current article.
- A sentiment analysis to review if the author has taken a positive, neutral or negative view on the topic.
- A bias analysis to check the article for potential bias which could sway the reliability of the news piece.
- A comparison of the consistency of image location and text location
- An emotional analysis of the article

### Division of Work

### Programming Languages

### Programming Tools

### Learning Challenges

### Hardware/Software Platform

### Special Hardware/Software Requirments
