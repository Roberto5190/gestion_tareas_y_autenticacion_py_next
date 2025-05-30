# app.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import config


# Crear app
app = Flask(__name__)
app.config.from_object("config")
app.url_map.strict_slashes = False

# Extensiones
CORS(app, origins=config.CORS_ORIGINS, supports_credentials=True)
JWTManager(app)

# Registrar blueprints
from routes.auth import auth_bp
from routes.tasks import tasks_bp
from routes.user import user_bp
app.register_blueprint(auth_bp)
app.register_blueprint(tasks_bp)
app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=config.DEBUG)
