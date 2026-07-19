from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    user_id: str
    profile_picture: Optional[str] = None
    hunts_created: List[str] = []
    hunts_participated: List[str] = []
    total_score: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
