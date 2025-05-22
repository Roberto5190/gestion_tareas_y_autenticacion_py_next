
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.store import TaskManager, DataStore

tasks_bp = Blueprint("tasks", __name__, url_prefix="/api/tasks")

@tasks_bp.get("/")
@jwt_required()
def list_tasks():
    print("login")
    username = get_jwt_identity()
    tasks = TaskManager.list(DataStore.users[username])
    return jsonify([t.__dict__ for t in tasks]), 200

@tasks_bp.post("/")
# @jwt_required()
def create_task():
    username = get_jwt_identity()
    data = request.get_json()
    task = TaskManager.create(DataStore.users[username], data["title"], data.get("description",""))
    return jsonify(task.__dict__), 201
