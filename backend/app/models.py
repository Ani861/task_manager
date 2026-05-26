from enum import Enum
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SQLEnum, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class TaskStage(str, Enum):
    TODO = 'Todo'
    IN_PROGRESS = 'In Progress'
    DONE = 'Done'

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)

    tasks = relationship('Task', back_populates='owner', cascade='all, delete-orphan')

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    stage = Column(SQLEnum(TaskStage, name='task_stage'), nullable=False, default=TaskStage.TODO)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    owner = relationship('User', back_populates='tasks')
