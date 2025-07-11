from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import create_access_token, set_access_cookies
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
        session['username'] = user.username #guardamos el username en sesion
        print("Usuario guardado en sesión:", session.get('username'))

        token = create_access_token(identity=user.username)
        resp = jsonify(msg="Login OK")
        # Guarda el JWT en una cookie httpOnly
        set_access_cookies(resp, token)
        return resp, 200
    except ValueError as e:
        return jsonify(error=str(e)), 401
