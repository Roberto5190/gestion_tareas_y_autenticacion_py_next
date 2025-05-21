
import uuid #Para generar identificadores únicos universales

class Task:
    def __init__(self, title: str, description: str, owner: str):
        if not title or len(title) > 100:
            raise ValueError("Título inválido")
        self.id = str(uuid.uuid4()) #cadena única generada por uuid4()
        self.title = title
        self.description = description
        self.owner = owner