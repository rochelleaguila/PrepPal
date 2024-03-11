from flask import jsonify, request, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from werkzeug.security import check_password_hash, generate_password_hash
from api.models import User, db
from flask_mail import Mail, Message

import os
import app

auth = Blueprint('auth', __name__)
mail = Mail()

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_s')
app.config['SECURITY_PASSWORD_SALT'] = os.getenv('SECURITY_PASSWORD_SALT', 'default_password_salt')
app.config['MAIL_DEFAULT_SENDER'] = 'preppalpwrecovery@gmail.com'


@auth.route('/login', methods=['POST'])
def user_login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

@auth.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@auth.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"msg": "Username or email already exists"}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User successfully registered"}), 201

s = URLSafeTimedSerializer(app.config['SECRET_KEY'])

@auth.route('/recover_password', methods=['POST'])
def recover_password():
    email = request.json.get('email', None)
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Email not found"}), 404

    token = s.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])
    recovery_url = f'https://yourfrontenddomain.com/reset_password/{token}'

    msg = Message("Password Reset", recipients=[email])
    msg.body = f'Your password reset link is: {recovery_url}'
    mail.send(msg)

    return jsonify({"msg": "Password reset link has been sent to your email."}), 200

@auth.route('/reset_password/<token>', methods=['POST'])
def reset_password(token):
    new_password = request.json.get('password', None)
    try:
        email = s.loads(token, salt=app.config['SECURITY_PASSWORD_SALT'], max_age=3600)  # Token expires after 1 hour
    except (SignatureExpired, BadSignature):
        return jsonify({"msg": "The password reset link is invalid or has expired."}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    user.password_hash = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"msg": "Your password has been updated."}), 200

@auth.route('/edit_password', methods=['POST'])
@jwt_required()
def edit_password():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    current_password = request.json.get('current_password', None)
    new_password = request.json.get('new_password', None)

    if not user or not check_password_hash(user.password_hash, current_password):
        return jsonify({"msg": "Current password is incorrect"}), 401

    user.password_hash = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"msg": "Password updated successfully"}), 200

@auth.route('/edit_email', methods=['POST'])
@jwt_required()
def edit_email():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    new_email = request.json.get('new_email', None)

    if User.query.filter_by(email=new_email).first():
        return jsonify({"msg": "This email is already in use"}), 409

    user.email = new_email
    db.session.commit()

    return jsonify({"msg": "Email updated successfully"}), 200
