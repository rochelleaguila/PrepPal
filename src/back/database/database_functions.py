from back.models.models import db, Preference, DietStyle, DietRestriction, Cuisine

def get_diet_style_name(diet_style_id):
    diet_style = DietStyle.query.filter_by(diet_style_id=diet_style_id).first()
    return diet_style.name if diet_style else None

def get_diet_restriction_name(diet_restriction_id):
    diet_restriction = DietRestriction.query.filter_by(diet_restriction_id=diet_restriction_id).first()
    return diet_restriction.name if diet_restriction else None

def get_cuisine_name(cuisine_id):
    cuisine = Cuisine.query.filter_by(cuisine_id=cuisine_id).first()
    return cuisine.name if cuisine else None

def fetch_preferences(user_id):
    preferences = Preference.query.filter_by(user_id=user_id).first()
    if not preferences:
        return {}

    return {
        "diet": get_diet_style_name(preferences.diet_style_id),
        "intolerances": get_diet_restriction_name(preferences.diet_restriction_id),
        "cuisine": get_cuisine_name(preferences.cuisine_id),
        # Parse other_info if any more is needed
    }

