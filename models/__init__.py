import os
from models.base_model import BaseModel
from models.user_tasks import UserTasks
from models.user import User

"""CNC - dictionary = { Class Name (string) : Class Type }"""

if os.environ.get('HBNB_TYPE_STORAGE') == 'db':
    from models.engine import db_storage
    CNC = db_storage.DBStorage.CNC
    storage = db_storage.DBStorage()
else:
    from models.engine import file_storage
    CNC = file_storage.FileStorage.CNC
    storage = file_storage.FileStorage()

storage.reload()
