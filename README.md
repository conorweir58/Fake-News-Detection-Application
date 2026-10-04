# Fake News Detection Application

## Installation Guide

### Prerequisite

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

### Manual Install Instructions

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

6. Setup Database

For our implementation of the web application we setup a PostgreSQL Database with the intention of deployment.

However this is not necessary to install and run the web application locally, this can be done using an sqlite3 database.

#### SQLite3 Setup

To setup an sqlite3 Database instead, inside of the ```keepitreal/backend/backend_config/settings.py``` replace this code:

```python
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

```python
DATABASES = {
  'default': {
      'ENGINE': 'django.db.backends.sqlite3',
      'NAME': BASE_DIR / 'db.sqlite3',
  }
}
```

And remove this from the top of the file:

```python
#Databases info
user = config("USER")
password = config("PASSWORD")
```

#### PostgreSQL Setup (Our Implementation Setup)

With PostgreSQL installed, setup and running on your local machine [(Can be installed here)](https://www.postgresql.org/).

Connect to PostgreSQL database server:

```bash
psql -U postgres
```

and create the database with the following commands:

```sql
CREATE ROLE <YOUR_NAME> WITH LOGIN PASSWORD <YOUR_PASSWORD>;
CREATE DATABASE "FakenewsDatabase" OWNER <YOUR_NAME>;
\q
```

and add this to your .env:

```bash
USER="<YOUR_NAME>"
PASSWORD="<YOUR_PASSWORD>"
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
