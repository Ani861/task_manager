from enum import Enum
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, validator

class TaskStage(str, Enum):
    TODO = 'Todo'
    IN_PROGRESS = 'In Progress'
    DONE = 'Done'

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None

class TaskBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    stage: TaskStage = TaskStage.TODO

    @validator('title')
    def validate_title(cls, value: str) -> str:
        if not value.strip():
            raise ValueError('Title must not be empty')
        return value.strip()

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    stage: Optional[TaskStage] = None

    @validator('title')
    def validate_title(cls, value: Optional[str]) -> Optional[str]:
        if value is not None and not value.strip():
            raise ValueError('Title must not be empty')
        return value.strip() if value is not None else value

class TaskResponse(TaskBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
