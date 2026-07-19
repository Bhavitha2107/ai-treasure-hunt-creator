from pydantic import BaseModel
from typing import List
from datetime import datetime

class ScoreBase(BaseModel):
    hunt_id: str
    user_id: str
    clues_solved: List[int]
    total_score: int
    time_taken: int

class ScoreCreate(ScoreBase):
    pass

class Score(ScoreBase):
    score_id: str
    rank: int
    certificate_url: Optional[str] = None
    created_at: datetime
    completed_at: datetime

    class Config:
        from_attributes = True

from typing import Optional
