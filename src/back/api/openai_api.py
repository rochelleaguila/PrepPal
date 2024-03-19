import openai
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_KEY = os.getenv('OPENAI_KEY')
openai.api_key = OPENAI_KEY

def basic_recipe_generation

def generate_recipe_based_on_preferences(user_preferences, base_recipes_titles):
    """
    Generate a custom recipe using OpenAI's GPT-4, based on user preferences and a list of base recipe titles.
    """
    preferences_summary = " ".join([f"{key}: {value}" for key, value in user_preferences.items() if value])
    base_recipes_str = ", ".join(base_recipes_titles)
    prompt = f"Create a unique recipe considering the following preferences: {preferences_summary}. Use these recipes for inspiration: {base_recipes_str}."

    response = openai.Completion.create(
        engine="gpt-4",
        prompt=prompt,
        temperature=0.7,
        max_tokens=1024,
        top_p=1.0,
        frequency_penalty=0.5,
        presence_penalty=0.0
    )

    return response.choices[0].text.strip()

def generate_image_from_recipe(recipe_description):
    """
    Generate an image based on a recipe description using OpenAI's DALL·E.
    """
    response = openai.Image.create(
        engine="davinci-codex",  # Adjust with the correct identifier for DALL·E
        prompt=recipe_description,
        n=1,  # Number of images to generate
        size="1024x1024"
    )

    return response.data[0].url

'''
def generate_custom_recipe(base_recipes, user_preferences):
    """
    Generate a custom recipe based on base recipes and user preferences.

    :param base_recipes: List of recipe titles or descriptions from Spoonacular.
    :param user_preferences: User preferences including diet, intolerances, ingredients, and cuisine.
    :return: A string containing the generated custom recipe.
    """
    preferences_summary = f"Dietary preference: {user_preferences['diet']}. Intolerances: {user_preferences['intolerances']}. Must include: {user_preferences['includeIngredients']}. Must exclude: {user_preferences['excludeIngredients']}. Cuisine: {user_preferences['cuisine']}."
    prompt = f"Given these user preferences: {preferences_summary}. Generate a detailed recipe that fits these criteria, using inspiration from the following base recipes: {', '.join(base_recipes)}."

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=1024,
        top_p=1.0,
        frequency_penalty=0.5,
        presence_penalty=0.0
    )
    return response.choices[0].text.strip()
'''
