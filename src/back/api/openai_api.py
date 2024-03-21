import openai
from openai import OpenAI
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), '../../../../../.env')
load_dotenv(dotenv_path)

OPENAI_KEY = os.getenv('OPENAI_KEY')

openai.api_key = OPENAI_KEY

#client = OpenAI()

'''
Function below is used to parse the text given by openai to better fit parameters and recipe layout
'''
def parse_generated_recipe(recipe_text):
    # Define markers that indicate the start of each section
    title_marker = "Title:"
    summary_marker = "Summary:"
    ingredients_marker = "Ingredients:"
    instructions_marker = "Instructions:"
    macros_marker = "Macros:"

    # Find the positions of each marker in the text
    title_start = recipe_text.find(title_marker) + len(title_marker)
    summary_start = recipe_text.find(summary_marker) + len(summary_marker)
    ingredients_start = recipe_text.find(ingredients_marker) + len(ingredients_marker)
    instructions_start = recipe_text.find(instructions_marker) + len(instructions_marker)
    macros_start = recipe_text.find(macros_marker) + len(macros_marker)

    # Extract the content based on the markers
    title = recipe_text[title_start:summary_start - len(summary_marker)].strip()
    summary = recipe_text[summary_start:ingredients_start - len(ingredients_marker)].strip()
    ingredients = recipe_text[ingredients_start:instructions_start - len(instructions_marker)].strip()
    instructions = recipe_text[instructions_start:macros_start - len(macros_marker)].strip()
    macros = recipe_text[macros_start:].strip()

    return {
        "title": title,
        "summary": summary,
        "ingredients": ingredients,
        "instructions": instructions,
        "macros": macros
    }


def basic_recipe_generation(diet_style, cuisine, health_focus=None):
    prompt = f"Create a title, a brief summary, list of ingredients, cooking instructions, and macros for a recipe suitable for a {diet_style.lower()} diet, incorporating {cuisine.lower()} cuisine"
    #prompt = f"Create a title, a brief summary, list of ingredients, cooking instructions, and macros for a {diet_style.lower()} recipe that has {cuisine.lower()} influences"
    if health_focus:
        prompt += f" and focuses on being {health_focus.lower()}."
    prompt += "\n\nTitle:\n\nSummary:\n\nIngredients:\n\nInstructions:\n\nMacros:\n- Calories: Cal\n- Sugar: g\n- Protein: g\n- Fat: g\n- Carbs: g"

    try:
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "system", "content": prompt}]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error in recipe generation: {e}")
        return "Could not generate a recipe at this time."

def generate_recipe_preferences(preferences):
    """
    Generates a detailed recipe based on comprehensive user preferences using OpenAI GPT-4.
    :param preferences: A dictionary containing user's preferences including diet style, cuisine, serving size, and macros.
    :return: Generated recipe as a string.
    """
    diet_style = preferences.get('diet_style_name', 'any diet style').lower()
    cuisine = preferences.get('cuisine_name', 'any cuisine').lower()
    serving_size = preferences.get('serving_size', 1)
    diet_restriction = preferences.get('diet_restriction', 'any restriction').lower()
    protein_g = preferences.get('protein_g', 'any')
    fat_g = preferences.get('fat_g', 'any')
    carbs_g = preferences.get('carbs_g', 'any')
    calories = preferences.get('calories', 'any')

    prompt = f"Create a detailed recipe for a serving size of {serving_size}, targeting {calories} calories, with {protein_g}g of protein, {fat_g}g of fat, and {carbs_g}g of carbs. The recipe should fit a {diet_style} diet, have {cuisine} influences, take into account seriously the {diet_restriction} and include a title, summary, list of ingredients, cooking instructions, and detailed macros."
    prompt += "\n\nTitle:\n\nSummary:\n\nIngredients:\n\nInstructions:\n\nMacros:\n- Calories: Cal\n- Sugar: g\n- Protein: g\n- Fat: g\n- Carbs: g"

    try:
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "system", "content": prompt}]
        )
        # Adjust according to the OpenAI's response structure
        recipe_content = response.choices[0].message['content']
        return recipe_content.strip()
    except Exception as e:
        print(f"Error in detailed recipe generation: {e}")
        return "Could not generate a recipe at this time."



def generate_image_from_recipe(recipe_description):
    """
    Generate an image based on a recipe description using OpenAI's DALL·E.
    """
    try:
        # Add more specific details to the prompt for a realistic yet creative output
        prompt = f"A realistic depiction of '{recipe_description}'."

        response = openai.images.generate(
            model="dall-e-3",
            prompt=prompt,
            n=1,  # Number of images to generate
            size="1024x1024"
        )

        return response.data[0].url
    except Exception as e:
        print(f"Error generating image: {e}")
        return "assets/img/empty.svg"
