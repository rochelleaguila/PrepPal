"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS

from back.models.models import db, User
from back.api.utils import generate_sitemap, APIException
from back.database.database_functions import fetch_preferences
from .spoonacular_api import search_recipes_advanced
from .openai_api import basic_recipe_generation, parse_generated_recipe, generate_image_from_recipe

api = Blueprint('api', __name__)

CORS(api)

@api.route('/generate-basic-recipe', methods=['POST'])
def generate_basic_recipe():
    # Extract data from the frontend
    data = request.json

    diet_style = data.get("dietStyle")
    cuisine = data.get("cuisine")
    health_focus = data.get("health_focus")

    # Generate a recipe with OpenAI
    generated_recipe = basic_recipe_generation(diet_style, cuisine, health_focus)

    parsed_recipe = parse_generated_recipe(generated_recipe)

    image_url = generate_image_from_recipe(parsed_recipe["summary"])

    parsed_recipe["image_url"] = image_url

    #print(parsed_recipe)

    return jsonify(parsed_recipe)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
