Instalación y configuración del entorno
Sigue estos pasos para poner en marcha el proyecto en tu máquina local.

1. Clona el repositorio
```git clone <URL_DE_TU_REPOSITORIO>```

``cd <NOMBRE_DEL_REPOSITORIO>``


3. Configura y activa el entorno virtual (venv)
# Crea el entorno (en la raíz del proyecto)
``python -m venv venv``

# Windows
``venv\Scripts\activate``

# macOS / Linux
``source venv/bin/activate``


3. Instala dependencias del backend
# Asegúrate de estar en el entorno virtual
``pip install Flask Flask-CORS Flask-JWT-Extended python-dotenv marshmallow``

Opcional:
Genera un requirements.txt para controlar versiones:

``pip freeze > requirements.txt``

4. Configura Next.js (proxy de la API)
En el directorio frontend/, crea o edita next.config.js con el siguiente contenido:


``
/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/api/:path*',
      },
    ];
  },
};
``
Esto hará que todas las llamadas a /api/... desde el cliente se redirijan al backend en el puerto 5000.

5. Instala dependencias del frontend

``cd frontend``
``npm install``


6. Ejecuta el backend
Vuelve a la raíz (o donde esté tu app.py) y arranca Flask:


# Si usas flask run:
``export FLASK_APP=app.py``
``export FLASK_ENV=development``
``flask run --host=0.0.0.0 --port=5000``

# O directamente con Python:
``python app.py``

Verás algo como:
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)

   
7. Ejecuta el frontend
Desde frontend/:

``npm run dev``

Por defecto Next.js levantará el servidor en http://localhost:3000.
