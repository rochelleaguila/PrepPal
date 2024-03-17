import openai
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_KEY = os.getenv('OPENAI_KEY')
openai.api_key = OPENAI_KEY

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
