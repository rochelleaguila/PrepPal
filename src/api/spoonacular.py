import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('SPOONACULAR_KEY')
BASE_URL = 'https://api.spoonacular.com'
