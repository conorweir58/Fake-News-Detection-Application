from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from fakenewsapp.models import DetectionResults, User_History
from fakenewsapp.compute_trustworthiness import *
from fakenewsapp.extraction.extraction_tool import extract_from_text

User = get_user_model()

class UserModelTest(TestCase):

    def test_create_user(self):
        test_user = User.objects.create_user(username="testuser", email="testemail@mail.dcu.ie", password="testpassword")
        self.assertEqual(test_user.email, "testemail@mail.dcu.ie")
        self.assertTrue(test_user.check_password("testpassword"), True)
        self.assertFalse(test_user.is_staff)
        self.assertTrue(test_user.is_active)
        self.assertFalse(test_user.is_superuser)

    def test_create_superuser(self):
        test_admin = User.objects.create_superuser(email="adminemail@mail.dcu.ie", password="testpassword")
        self.assertEqual(test_admin.email, "adminemail@mail.dcu.ie")
        self.assertTrue(test_admin.check_password("testpassword"), True)
        self.assertTrue(test_admin.is_staff)
        self.assertTrue(test_admin.is_active)
        self.assertTrue(test_admin.is_superuser)

class LoginAPITest(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username="testlogin", email="testlogin@mail.dcu.ie", password="logintest")

    def test_login_success(self):
        response = self.client.post(
            "/api/login/", data={"password": "logintest", "email":"testlogin@mail.dcu.ie"},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["authenticated"], "true")

    def test_login_failure(self):
        response = self.client.post(
            "/api/login/", 
            data={"email": "testlogin@mail.dcu.ie", "password": "testlogin"},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()["authenticated"], "false")
        self.assertIn("Invalid", response.json()["message"])

class TestDetectionResults(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username="testlogin", email="testlogin@mail.dcu.ie", password="logintest")

    def detection_creation(self):
        result = DetectionResults.objects.create(
            user = self.test_user_creation(),
            text = "This is example text for the test",
            result = 0.7,
            pulk = {"label": "REAL", "score": 0.92},
            sentiment = {"label": "postitive", "score": 0.7},
            bias = {"label": "political", "score": 0.6},
            gpt = {"label": "Human", "score": 0.83},
            title = "Testing the Detection Model",
        )

        self.assertEqual(result.user, self.user)
        self.assertEqual(result.result, 0.7)
        self.assertEqual(result.pulk, 0.92)
        self.assertEqual(result.sentiment, 0.7)
        self.assertEqual(result.gpt["label"], "Human")
        self.assertEqual(result.bias["label"], "political")

class TestUserHistory(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testDetection", email="testdetection@mail.dcu.ie", password="detectiontest")
        self.result = DetectionResults.objects.create(
            user=self.user, 
            text = "This is example text for the test of the detection",
            result = 0.34,
            pulk = {"label": "REAL", "score": 0.96},
            sentiment = {"label": "postitive", "score": 0.3},
            bias = {"label": "political", "score": 0.5},
            gpt = {"label": "Human", "score": 0.1},
            title = "Testing the Detection Model",
        )
    
    def test_user_history(self):
        entry = User_History.objects.create(
            user = self.user,
            response = self.result,
        )

        self.assertEqual(entry.user, self.user)
        self.assertEqual(entry.response.result, 0.34)
        self.assertEqual(entry.response.pulk['score'], 0.96)
        self.assertNotEqual(entry.response.gpt['score'], 0.66)

class TestScoringFunctions(TestCase):

    # ----------------- Pulk Tests ------------------
    
    def test_pulk_real(self):
        result = [{"label": "REAL", "score": 0.9}]
        self.assertAlmostEqual(pulk_score(result), 0.9)
    
    def test_pulk_fake(self):
        result = [{"label": "FAKE", "score": 0.8}]
        self.assertAlmostEqual(pulk_score(result), 0.2)

    def test_pulk_min(self):
        result = [{"label": "FAKE", "score": 0.9999999}]
        self.assertAlmostEqual(pulk_score(result), 0.01)

    # ----------------- Sentiment Tests ------------------

    def test_sentiment_pos(self):
        result = [{"label": "positive", "score": 0.5}]
        self.assertAlmostEqual(sentiment_score(result), 0.5)

    def test_sentiment_neg(self):
        result = [{"label": "negative", "score": 0.8}]
        self.assertAlmostEqual(sentiment_score(result), 0.2)

    def test_sentiment_neutral(self):
        result = [{"label": "neutral", "score": 0.7}]
        self.assertAlmostEqual(sentiment_score(result), 0.85)

    def test_sentiment_min(self):
        result = [{"label": "negative", "score": 0.999}]
        self.assertAlmostEqual(sentiment_score(result), 0.15)

    # ----------------- GPT Tests ------------------

    def test_gpt_ai(self):
        result = [{"label": "AI", "score": 0.7}]
        self.assertAlmostEqual(gpt_score(result), 0.3)

    def test_gpt_human(self):
        result = [{"label": "Human", "score": 0.6}]
        self.assertAlmostEqual(gpt_score(result), 0.6)

    def test_gpt_min(self):
        result = [{"label": "AI", "score": 0.999}]
        self.assertAlmostEqual(gpt_score(result), 0.01)

    # ----------------- Bias Tests ------------------

    def test_bias_low(self):
        result = [[{"label": "political", "score": 0.2}]]
        weight = {"political": 1.3}
        self.assertGreater(bias_score(result, weight), 0.75)

    def test_bias_high(self):
        result = [[{"label": "racial", "score": 0.99}]]
        weight = {"racial": 1.3}
        self.assertLess(bias_score(result, weight), 0.25)

    def test_bias_min(self):
        result = [[{"label": "religious", "score": 10.0}]]
        weight = {"religious": 1.2}
        self.assertAlmostEqual(bias_score(result, weight), 0.01)

    # ----------------- Computation Tests ------------------

    def test_all_models_computation(self):
        api_models = {
            "pulk": [{"label": "FAKE", "score": 0.4}],
            "sentiment": [{"label": "neutral", "score": 0.9}],
            "bias": [[{"label": "educational", "score": 0.5}]],
            "gpt": [{"label": "Human", "score": 0.78}]
        }

        score = computation(api_models)
        self.assertTrue(0 <= score <= 1)

    def test_some_models_computation(self):
        api_models = {
            "pulk": [{"label": "REAL", "score": 0.65}],
            "gpt": [{"label": "Human", "score": 0.75}]
        }

        score = computation(api_models)
        self.assertTrue(0 <= score <= 1)

class TestExtractionTool(TestCase):

    def test_extraction_text_tool(self):
        text = "This should be the Title\n This should be the text"
        article = extract_from_text(text)
        self.assertEqual(article.title, "This should be the Title")
        self.assertEqual(article.text, "This should be the Title\n This should be the text") # we are keeping the title as a part of the body of text because the first line may not always be the title
