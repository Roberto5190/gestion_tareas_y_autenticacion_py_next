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

# COOKIES
JWT_TOKEN_LOCATION = ["cookies", "headers"]
JWT_COOKIE_SECURE   = False       # en dev HTTP
JWT_COOKIE_SAMESITE = "Strict"
JWT_ACCESS_COOKIE_PATH  = "/"
JWT_REFRESH_COOKIE_PATH  = "/"

# CORS
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://10.123.2.17:3000",
    ]

# # SSL para desarrollo
# SSL_CONTEXT = ("cert.pem", "key.pem")  # generar con OpenSSL si se quiere HTTPS
