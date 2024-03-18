import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('SPOONACULAR_KEY')
BASE_URL = 'https://api.spoonacular.com'

def search_recipes_advanced(query, number=10, diet=None, intolerances=None, includeIngredients=None, excludeIngredients=None, cuisine=None):
    """Search for recipes based on advanced query parameters."""
    endpoint = f"{BASE_URL}/recipes/complexSearch"
    parameters = {
        "apiKey": API_KEY,
        "query": query,
        "number": number,
        "diet": diet,
        "intolerances": intolerances,
        "includeIngredients": includeIngredients,
        "excludeIngredients": excludeIngredients,
        "cuisine": cuisine
    }
    response = requests.get(endpoint, params={k: v for k, v in parameters.items() if v is not None})
    return response.json()
