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

2.3 [User Characteristics](#23-user-characteristics)

2.4 [Operational Scenarios](#24-operational-scenarios)

2.5 [Constraints](#25-constraints)


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

## 1.4 References

- [Django-React Software Architecture - Mahdia Aliyya (Medium)](https://mahdiaaliyya.medium.com/software-architecture-bb44325bf0cf)

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

The presentation layer of the web application were implemented using ReactJS for creating a dynamic and fast-to-build capabilities due to it's component-based approach and virtual DOM. Reacts component-based approach also allowed us to follow the SPA (Single-page application) approach, allowing us to curate a modular codebase with an easy-to-scale final application.

This was all imporoved by the use of Vite, allowing for fast HMR (Hot Module Replacement)

### 2.2.3 The Backend (DJANGO + REST) Architecture
