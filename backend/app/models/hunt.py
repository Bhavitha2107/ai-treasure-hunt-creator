from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime

class HuntBase(BaseModel):
    title: str
    description: str
    theme: Literal["fun", "academic", "comic", "rhyme", "riddle", "cryptic", "emoji"]
    age_group: Literal["kids", "teens", "adults"]
    academic: bool = False
    location_type: Literal["indoor", "outdoor"]
    num_clues: int = Field(..., ge=1, le=8)
    difficulty: Literal["easy", "medium", "hard"] = "medium"

class HuntCreate(HuntBase):
    pass

class Hunt(HuntBase):
    hunt_id: str
    creator_id: str
    clues: List[dict] = []
    status: Literal["draft", "active", "completed"] = "draft"
    created_at: datetime
    updated_at: datetime
    max_clues: int = 8

    class Config:
        from_attributes = True
