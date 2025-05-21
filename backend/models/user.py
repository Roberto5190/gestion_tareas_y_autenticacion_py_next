
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, username, password):
        self._username = username
        self.password_hash = generate_password_hash(password)
        self.tasks = []

    @property
    def username(self):
        return self._username

    def check_password(self, pwd): #toma la contraseña en texto plano 
        return check_password_hash(self.password_hash, pwd) #la compara con self.password_hash (devuelve True o False)




