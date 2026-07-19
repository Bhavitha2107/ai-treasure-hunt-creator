from fastapi import APIRouter, HTTPException
from ..services.firebase_service import FirebaseService
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/scores", tags=["scores"])
fb = FirebaseService()

class ScoreSubmit(BaseModel):
    hunt_id: str
    user_id: str
    clues_solved: list
    total_score: int
    time_taken: int

@router.post("/submit")
async def submit_score(score_data: ScoreSubmit):
    """
    Submit score for a completed hunt
    """
    try:
        score_dict = score_data.dict()
        score_dict['rank'] = 1  # Would calculate based on leaderboard
        score_dict['created_at'] = datetime.now()
        score_dict['completed_at'] = datetime.now()
        
        score_id = fb.create_score(score_dict)
        
        return {
            "score_id": score_id,
            "total_score": score_data.total_score,
            "message": "Score submitted successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/hunt/{hunt_id}")
async def get_scores_by_hunt(hunt_id: str):
    """
    Get all scores for a hunt
    """
    try:
        return {
            "hunt_id": hunt_id,
            "scores": []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}/hunt/{hunt_id}")
async def get_user_score(user_id: str, hunt_id: str):
    """
    Get user's score for a specific hunt
    """
    try:
        return {
            "user_id": user_id,
            "hunt_id": hunt_id,
            "score": {}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
