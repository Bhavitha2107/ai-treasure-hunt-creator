from fastapi import APIRouter, HTTPException
from ..services.firebase_service import FirebaseService

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])
fb = FirebaseService()

@router.get("/{hunt_id}")
async def get_leaderboard(hunt_id: str, limit: int = 10):
    """
    Get leaderboard for a hunt
    """
    try:
        standings = fb.get_leaderboard(hunt_id, limit)
        
        return {
            "hunt_id": hunt_id,
            "total_participants": len(standings),
            "standings": standings
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
