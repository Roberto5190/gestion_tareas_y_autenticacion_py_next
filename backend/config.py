from dotenv import load_dotenv
import os
from datetime import timedelta

load_dotenv()

# Secretos y tiempos de expiración: SÍ en .env
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", SECRET_KEY)
JWT_ACCESS_TOKEN_EXPIRES = timedelta(
    hours=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES_HOURS", "1"))
)

# Ubicaciones de token: valor por defecto ok en config, pero opcional en .env
JWT_TOKEN_LOCATION = os.getenv("JWT_TOKEN_LOCATION", "cookies,headers").split(",")

# Cookies: path y SameSite son estáticos, puedes dejarlos en config
JWT_ACCESS_COOKIE_PATH = os.getenv("JWT_ACCESS_COOKIE_PATH", "/")
JWT_REFRESH_COOKIE_PATH = os.getenv("JWT_REFRESH_COOKIE_PATH", "/")
JWT_COOKIE_SAMESITE = os.getenv("JWT_COOKIE_SAMESITE", "Strict")
JWT_COOKIE_SECURE = os.getenv("JWT_COOKIE_SECURE", "False").lower() == "true"

# CSRF (sólo en dev): por defecto False, no hace falta en .env a menos que quieras togglearlo
JWT_COOKIE_CSRF_PROTECT = os.getenv("JWT_COOKIE_CSRF_PROTECT", "False").lower() == "true"

# Orígenes permitidos: conviene ponerlos en .env si difieren entre entornos
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")


# # SSL para desarrollo
# SSL_CONTEXT = ("cert.pem", "key.pem")  # generar con OpenSSL si se quiere HTTPS
