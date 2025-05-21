# config.py
import os
from datetime import timedelta

# Modo de depuración
DEBUG = True

# Claves secretas
SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", SECRET_KEY)

# Duración del token
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

# CORS
CORS_ORIGINS = ["http://localhost:3000"]

# SSL para desarrollo
SSL_CONTEXT = ("cert.pem", "key.pem")  # generar con OpenSSL si se quiere HTTPS
