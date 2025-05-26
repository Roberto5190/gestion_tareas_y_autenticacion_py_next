
from models.user import User
from models.task import Task

class DataStore:
    users: dict[str, User] = {}   # mapea nombres de usuario a objetos User
    tasks: dict[str, list[Task]] = {}

class AuthManager:
    #Se usa cuando el método no necesita leer ni modificar atributos de instancia o de clase.
    @staticmethod   #Convierte el método que sigue en una función “independiente” del objeto o la clase.
    def register(username, password):
        if username in DataStore.users:
            raise ValueError("Usuario ya existe")
        
        DataStore.users[username] = User(username, password) #instancia un nuevo objeto User y lo asocia al diccionario
        DataStore.tasks[username] = [] #inicializa una lista vacia para este usuario

    @staticmethod
    def authenticate(username, password):
        user = DataStore.users.get(username) #asigna a la variable user el nombre de usuario del DataStore si no asigna None
        if not user or not user.check_password(password): #not user -> comprubea si user es None(inexistente) y comprueba la contraseña enviada
            raise ValueError("Credenciales inválidas")
        return user #si la autenticacion es correcta se devuelve la instancia del usuario
    
    @staticmethod
    def username(username):
        return DataStore.users.get(username)

class TaskManager:
    @staticmethod
    def list(user):
        return DataStore.tasks.get(user.username, []) #devuelve la lista de tareas de un usuario

    @staticmethod
    def create(user, title, description):
        task = Task(title, description, user.username)
        DataStore.tasks[user.username].append(task)
        return task
