#!/usr/bin/python3
"""
User Class from Models Module
"""
import hashlib
import os
import models
from models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float
STORAGE_TYPE = os.environ.get('HBNB_TYPE_STORAGE')


class User(BaseModel, Base):
    """
        User class handles all application users
    """
    if STORAGE_TYPE == "db":
        __tablename__ = 'users'
        name = Column(String(128), nullable=False)
    else:
        name = ''

    def __init__(self, *args, **kwargs):
        """
            instantiates user object
        """
        super().__init__(*args, **kwargs)

    @property
    def u_tasks(self):
        """
        getter method, returns list of City objs from storage
        linked to the current State
        """
        task_list = []
        cont = 0
        for task in models.storage.all("UserTasks").values():
            if task.user_id == self.id:
                task_list.append(task.to_json())
        return task_list
