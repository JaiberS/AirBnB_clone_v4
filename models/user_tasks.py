#!/usr/bin/python3
"""
Review Class from Models Module
"""
import os
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, Float, ForeignKey
STORAGE_TYPE = os.environ.get('HBNB_TYPE_STORAGE')


class UserTasks(BaseModel, Base):
    """Review class handles all application reviews"""
    if STORAGE_TYPE == "db":
        __tablename__ = 'reviews'
        description = Column(String(1024), nullable=False)
        state = Column(String(10), nullable=False)
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    else:
        state = ''
        user_id = ''
        description = ''
