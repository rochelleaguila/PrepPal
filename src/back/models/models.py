from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Recipe(db.Model):
    __tablename__ = 'recipes'
    recipe_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    summary = db.Column(db.String(500), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    macros = db.Column(db.JSON, nullable=False)
    image_url = db.Column(db.Text)
    is_saved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())
    user = db.relationship('User', backref=db.backref('recipes', lazy=True))

    def to_dict(self):
        return {
            'recipe_id': self.recipe_id,
            'user_id': self.user_id,
            'title': self.title,
            'summary': self.summary,
            'instructions': self.instructions.split('\n') if self.instructions else [],
            'ingredients': self.ingredients.split('\n') if self.ingredients else [],  # Assuming ingredients are newline-separated
            'image_url': self.image_url,
            'is_saved': self.is_saved,
            'created_at': self.created_at.isoformat(),  # Convert datetime to ISO 8601 string
            'updated_at': self.updated_at.isoformat(),
        }

class Menu(db.Model):
    __tablename__ = 'menus'
    menu_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    menu_name = db.Column(db.String(255), nullable=False)
    menu_description = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())
    user = db.relationship('User', backref=db.backref('menus', lazy=True))

class MenuRecipe(db.Model):
    __tablename__ = 'menus_recipes'
    menu_id = db.Column(db.Integer, db.ForeignKey('menus.menu_id'), primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.recipe_id'), primary_key=True)
    menu = db.relationship('Menu', backref=db.backref('menu_recipes', cascade="all, delete-orphan"))
    recipe = db.relationship('Recipe', backref=db.backref('menu_recipes', cascade="all, delete-orphan"))

class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    ingredient_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text)
    nutritional_value = db.Column(db.String(255))  # Consider using a structured format or separate columns
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())

class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredients'
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.recipe_id'), primary_key=True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.ingredient_id'), primary_key=True)
    quantity = db.Column(db.String(50), nullable=False)
    recipe = db.relationship('Recipe', backref=db.backref('recipe_ingredients', cascade="all, delete-orphan"))
    ingredient = db.relationship('Ingredient', backref=db.backref('recipe_ingredients', cascade="all, delete-orphan"))

class DietStyle(db.Model):
    __tablename__ = 'diet_styles'
    diet_style_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

class DietRestriction(db.Model):
    __tablename__ = 'diet_restrictions'
    diet_restriction_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

class Cuisine(db.Model):
    __tablename__ = 'cuisines'
    cuisine_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

class Preference(db.Model):
    __tablename__ = 'preferences'
    preference_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    diet_style = db.Column(db.String(255))
    diet_restriction = db.Column(db.String(255))
    serving_size = db.Column(db.Integer)
    protein_g = db.Column(db.Numeric(5, 2))
    fat_g = db.Column(db.Numeric(5, 2))
    carbs_g = db.Column(db.Numeric(5, 2))
    calories = db.Column(db.Integer)
    cuisine = db.Column(db.String(255))
    other_info = db.Column(db.JSON)  # For MySQL JSON support
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())

    '''
    # Relationships in preferences
    diet_style = db.relationship('DietStyle', backref='preferences')
    diet_restriction = db.relationship('DietRestriction', backref='preferences')
    cuisine = db.relationship('Cuisine', backref='preferences')


class Preference(db.Model):
    __tablename__ = 'preferences'
    preference_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    preference_key = db.Column(db.String(255), nullable=False)
    preference_value = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), server_onupdate=db.func.current_timestamp())
    user = db.relationship('User', backref=db.backref('preferences', lazy=True))

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
'''
