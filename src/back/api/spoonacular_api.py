import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('SPOONACULAR_KEY')
BASE_URL = 'https://api.spoonacular.com'

def fetch_spoonacular_recipes(diet, cuisine, number_of_recipes=5):
    url = f"https://api.spoonacular.com/recipes/complexSearch"
    params = {
        'apiKey': API_KEY,
        'diet': diet,
        'cuisine': cuisine,
        'number': number_of_recipes
    }
    response = requests.get(url, params=params)
    recipes = response.json().get('results', [])
    # You might want to format these recipes into a string or a list of titles
    recipes_titles = [recipe['title'] for recipe in recipes]
    return ', '.join(recipes_titles)

'''
def search_recipes_advanced(user_preferences):
    """Search for recipes based on advanced user preferences."""
    endpoint = f"{BASE_URL}/recipes/complexSearch"
    parameters = {
        "apiKey": API_KEY,
        "number": 10,  # Adjust as needed
        "query": "",  # Optional: Specify a query if you want to narrow down results further
        "diet": user_preferences.get("diet"),
        "intolerances": user_preferences.get("intolerances"),
        "cuisine": user_preferences.get("cuisine"),
        # Include additional parameters as needed
    }
    response = requests.get(endpoint, params={k: v for k, v in parameters.items() if v is not None})
    return response.json()

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
'''
