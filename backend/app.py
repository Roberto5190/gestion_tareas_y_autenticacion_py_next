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
# app.config['JWT_SECRET_KEY'] = 'super-secret'
# Desactivar strict_slashes global: ninguna ruta hará redirect por “/” o sin “/”
app.url_map.strict_slashes = False

# Extensiones
CORS(app, origins=config.CORS_ORIGINS, supports_credentials=True)
JWTManager(app)

# Registrar blueprints
from routes.auth import auth_bp
from routes.tasks import tasks_bp
app.register_blueprint(auth_bp)
app.register_blueprint(tasks_bp)

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=config.DEBUG)
