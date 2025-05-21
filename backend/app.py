# app.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import config

# from flask_sqlalchemy import SQLAlchemy

# # Creamos la instancia de SQLAlchemy
# db = SQLAlchemy()

# Crear app
app = Flask(__name__)
app.config.from_object("config")

# Extensiones
CORS(app, origins=config.CORS_ORIGINS)
JWTManager(app)

# Registrar blueprints
from routes.auth import auth_bp
from routes.tasks import tasks_bp
app.register_blueprint(auth_bp)
app.register_blueprint(tasks_bp)

if __name__ == "__main__":
    app.run(ssl_context=None, debug=config.DEBUG)
