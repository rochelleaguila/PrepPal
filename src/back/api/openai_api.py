import openai
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_KEY = os.getenv('OPENAI_KEY')
openai.api_key = OPENAI_KEY

def basic_recipe_generation(diet_style, cuisine, health_focus=None):
    """
    Generates a basic recipe based on the given diet style, cuisine, and optional health focus.

    Parameters:
    - diet_style: The dietary style preference (e.g., Vegan, Keto).
    - cuisine: The cuisine preference (e.g., Italian, Mexican).
    - health_focus: Optional. A health focus such as 'Low Carb' or 'Hearty'.

    Returns:
    A string containing the generated recipe.
    """
    # Construct the prompt with the given parameters
    prompt_parts = [f"A {diet_style.lower()} recipe", f"cuisine is {cuisine.lower()}"]
    if health_focus:
        prompt_parts.append(f"focus on {health_focus.lower()}")
    prompt = f"Create a recipe where {' and '.join(prompt_parts)}."

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  # Change to the appropriate engine for GPT-4
            prompt=prompt,
            temperature=0.7,  # Adjust as needed for creativity
            max_tokens=150,  # Adjust based on how long you want the recipe to be
            top_p=1.0,
            frequency_penalty=0.5,
            presence_penalty=0.0
        )
        # Extracting and returning the generated recipe text
        recipe_text = response.choices[0].text.strip()
        return recipe_text
    except Exception as e:
        print(f"Error generating recipe: {e}")
        return "Could not generate a recipe at this time."

def generate_custom_recipe(user_preferences, base_recipes_titles):
    """
    Generate a custom recipe using OpenAI, based on user preferences including serving size,
    diet, intolerances, ingredients, and cuisine, and inspired by base recipe titles from Spoonacular.
    """
    # Constructing the prompt with user preferences, serving size, and base recipe titles
    preferences_summary = ", ".join([f"{key.replace('_', ' ').capitalize()}: {value}" for key, value in user_preferences.items() if value])
    base_recipes_str = ", ".join(base_recipes_titles)
    prompt = (f"Create a unique recipe for {user_preferences.get('serving_size', 'a few')} servings "
              f"considering the following preferences: {preferences_summary}. "
              f"Use inspiration from these recipes: {base_recipes_str}.")

    response = openai.Completion.create(
        engine="gpt-4",  # Change to the latest GPT-4 engine once available
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
