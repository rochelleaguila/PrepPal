import openai
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_KEY = os.getenv('OPENAI_KEY')
openai.api_key = OPENAI_KEY

def parse_generated_recipe(recipe_text):
    # Define markers that indicate the start of each section
    summary_marker = "Summary:"
    ingredients_marker = "Ingredients:"
    instructions_marker = "Instructions:"
    macros_marker = "Macros:"

    # Find the positions of each marker in the text
    summary_start = recipe_text.find(summary_marker) + len(summary_marker)
    ingredients_start = recipe_text.find(ingredients_marker) + len(ingredients_marker)
    instructions_start = recipe_text.find(instructions_marker) + len(instructions_marker)
    macros_start = recipe_text.find(macros_marker) + len(macros_marker)

    # Extract the content based on the markers
    summary = recipe_text[summary_start:ingredients_start - len(ingredients_marker)].strip()
    ingredients = recipe_text[ingredients_start:instructions_start - len(instructions_marker)].strip()
    instructions = recipe_text[instructions_start:macros_start - len(macros_marker)].strip()
    macros = recipe_text[macros_start:].strip()

    return {
        "summary": summary,
        "ingredients": ingredients,
        "instructions": instructions,
        "macros": macros
    }


def basic_recipe_generation(diet_style, cuisine, health_focus=None):
    engine = "gpt-4"
    prompt = f"Create a brief summary, list of ingredients, cooking instructions, and macros for a {diet_style.lower()} recipe that has {cuisine.lower()} influences"
    if health_focus:
        prompt += f" and focuses on being {health_focus.lower()}."

    prompt += "\n\nSummary:\n\nIngredients:\n\nInstructions:\n\nMacros:\n- Calories: \n- Sugar in g: \n- Protein in g: \n- Fat in g: \n- Carbs in g:"

    try:
        response = openai.Completion.create(
            engine=engine,
            prompt=prompt,
            temperature=0.5,
            max_tokens=500,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
            stop=["\n\n"]
        )
        recipe_text = response.choices[0].text.strip()
        return recipe_text
    except Exception as e:
        print(f"Error in recipe generation: {e}")
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
    try:
        response = openai.Image.create(
            engine="dalle-e-3",
            prompt=recipe_description,
            n=1,  # Number of images to generate
            size="1024x1024"
        )

        return response["data"][0]["url"]
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

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
