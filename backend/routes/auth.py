from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from utils.store import AuthManager

auth_bp = Blueprint("auth", __name__, url_prefix="/api")

@auth_bp.post("/register")
def register():
    data = request.get_json()
    try:
        AuthManager.register(data["username"], data["password"])
        return jsonify(msg="Usuario creado"), 201
    except ValueError as e:
        return jsonify(error=str(e)), 400

@auth_bp.post("/login")
def login():
    data = request.get_json()
    try:
        user = AuthManager.authenticate(data["username"], data["password"])
        token = create_access_token(identity=user.username)
        return jsonify(acces_token=token), 200
    except ValueError as e:
        return jsonify(error=str(e)), 401
