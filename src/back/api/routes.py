from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

from back.models.models import db, User, Menu, Recipe, MenuRecipe, Preference, DietStyle, Cuisine, DietRestriction
from back.api.utils import generate_sitemap, APIException
from back.database.database_functions import fetch_preferences
from .spoonacular_api import fetch_spoonacular_recipes
from .openai_api import basic_recipe_generation, parse_generated_recipe, generate_image_from_recipe, generate_recipe_preferences

api = Blueprint('api', __name__)

CORS(api)

'''
Below are all the routes to generating recipes, from basic recipes to more complex ones
'''
@api.route('/generate-basic-recipe', methods=['POST'])
def generate_basic_recipe():
    # Extract data from the frontend
    data = request.json

    print("Received request data: ", data)

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

@api.route('/generate_recipe_preferences/<int:user_id>', methods=['GET'])
def generate_recipe(user_id):
    preference = Preference.query.filter_by(user_id=user_id).first_or_404()

    # Assuming DietStyle and Cuisine have a 'name' attribute
    preferences = {
        'diet_style_name': DietStyle.query.get(preference.diet_style_id).name,
        'cuisine_name': Cuisine.query.get(preference.cuisine_id).name,
        'diet_restriction_name': DietRestriction.query.get(preference.diet_restriction_id).name,
        'serving_size': preference.serving_size,
        'protein_g': str(preference.protein_g),
        'fat_g': str(preference.fat_g),
        'carbs_g': str(preference.carbs_g),
        'calories': str(preference.calories)
    }

    recipe = generate_recipe_preferences(preferences)
    return jsonify({"recipe": recipe}), 200

'''
Below are all the routes connected to recipes, all recipes need a user
'''
@api.route('/recipes/save', methods=['POST'])
@jwt_required()
def save_recipe():
    """
    Save a recipe for the logged-in user.
    """
    user_id = get_jwt_identity()
    data = request.json

    # Validate data
    if 'title' not in data or 'ingredients' not in data:
        return jsonify({"msg": "Missing recipe data"}), 400

    # Create new Recipe object
    new_recipe = Recipe(user_id=user_id, **data)
    db.session.add(new_recipe)
    db.session.commit()

    return jsonify({"msg": "Recipe saved successfully", "recipe_title": new_recipe.title}), 201

@api.route('/user/recipes', methods=['GET'])
@jwt_required()
def get_user_recipes():
    """
    Fetch all recipes saved by the logged-in user.
    """
    user_id = get_jwt_identity()
    recipes = Recipe.query.filter_by(user_id=user_id).all()
    return jsonify([recipe.to_dict() for recipe in recipes]), 200


'''
Below are all the routes connected to the menu, menus need a user to acces them
'''
@api.route('/user/menus', methods=['GET'])
@jwt_required()
def get_user_menus():
    #user_id = request.args.get(user_id)
    user_id = get_jwt_identity()
    menus = Menu.query.filter_by(user_id=user_id).all()
    return jsonify([{"menu_id": menu.menu_id, "menu_name": menu.menu_name} for menu in menus]), 200

@api.route('/menus/<int:menu_id>/add_recipe', methods=['POST'])
@jwt_required()
def add_recipe_to_menu(menu_id):
    """
    Add an existing recipe to an existing menu.
    """
    user_id = get_jwt_identity()
    data = request.json

    # Validate data
    if 'recipe_id' not in data:
        return jsonify({"msg": "Missing recipe ID"}), 400

    recipe_id = data['recipe_id']
    # Validate that the menu and recipe belong to the user
    menu = Menu.query.filter_by(menu_id=menu_id, user_id=user_id).first()
    recipe = Recipe.query.filter_by(recipe_id=recipe_id, user_id=user_id).first()

    if not menu or not recipe:
        return jsonify({"msg": "Menu or Recipe not found"}), 404

    # Add recipe to menu
    menu_recipe = MenuRecipe(menu_id=menu_id, recipe_id=recipe_id)
    db.session.add(menu_recipe)
    db.session.commit()

    return jsonify({"msg": "Recipe added to menu successfully"}), 200

@api.route('/menus/create', methods=['POST'])
@jwt_required()
def create_new_menu():
    """
    Create a new menu with recipes for the logged-in user.
    """
    user_id = get_jwt_identity()
    data = request.json

    # Validate data
    if 'menuName' not in data or 'recipes' not in data:
        return jsonify({"msg": "Missing menu name or recipes"}), 400

    # Create new Menu object
    new_menu = Menu(user_id=user_id, menu_name=data['menuName'])
    db.session.add(new_menu)
    db.session.flush()  # To get the new_menu.menu_id before committing

    # Optionally add recipes to the new menu
    for recipe_id in data['recipes']:
        # Validate that the recipe belongs to the user
        if not Recipe.query.filter_by(recipe_id=recipe_id, user_id=user_id).first():
            continue  # Skip if recipe does not belong to user
        menu_recipe = MenuRecipe(menu_id=new_menu.menu_id, recipe_id=recipe_id)
        db.session.add(menu_recipe)

    db.session.commit()

    return jsonify({"msg": "New menu created successfully", "menu_id": new_menu.menu_id}), 201

'''
All the routes connected to preferences
'''
@api.route('/user/preferences', methods=['POST'])
def save_preferences():
    data = request.json
    new_preference = Preference(
        user_id=data.get('user_id'),
        diet_style_id=data.get('diet_style_id'),
        diet_restriction_id=data.get('diet_restriction_id'),
        serving_size=data.get('serving_size'),
        protein_g=data.get('protein_g'),
        fat_g=data.get('fat_g'),
        carbs_g=data.get('carbs_g'),
        calories=data.get('calories'),
        cuisine_id=data.get('cuisine_id'),
        other_info=data.get('other_info')
    )
    db.session.add(new_preference)
    db.session.commit()
    return jsonify({"message": "Preferences saved successfully"}), 200

'''
All functions related to the user
'''
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    # Use Flask-JWT-Extended to get the current user's identity from the token
    current_user_username = get_jwt_identity()

    # Query the database for the user using the username
    user = User.query.filter_by(username=current_user_username).first()

    if user:
        # If the user was found, return the username
        return jsonify(username=user.username), 200
    else:
        # If no user was found with the provided identity, return an error
        return jsonify({'message': 'User not found!'}), 404


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
