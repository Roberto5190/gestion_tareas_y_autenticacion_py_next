from flask import jsonify, session, Blueprint
from utils.store import DataStore


user_bp = Blueprint("user", __name__, url_prefix="/api/user")

@user_bp.get('/')
def username():
    username = session.get('username')
    if not username:
        return jsonify({'user': None}), 401

    user = DataStore.users.get(username)
    if not user:
        return jsonify({'user': None}), 404

    return jsonify({'user': {'username': user.username}})