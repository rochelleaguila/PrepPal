from dotenv import load_dotenv
load_dotenv()

import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS

from api.utils import APIException, generate_sitemap
from api.routes import api
from api.commands import setup_commands
from api.models import db

from authentication.admin import setup_admin
from authentication.auth import auth


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

app.secret_key = os.getenv('FLASK_APP_KEY', 'magic_words')

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'secret_password')
jwt = JWTManager(app)

db_url = os.getenv("DATABASE_URL")

# Set up database configuration directly for MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = db_url if db_url else "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions

migrate = Migrate(app, db)

'''
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
'''

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

app.register_blueprint(auth, url_prefix='/auth')
# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
