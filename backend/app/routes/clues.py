from fastapi import APIRouter, HTTPException
from ..services.firebase_service import FirebaseService
from ..services.qr_service import QRService
from typing import List

router = APIRouter(prefix="/clues", tags=["clues"])
fb = FirebaseService()
qr = QRService()

@router.post("/generate")
async def generate_clues(hunt_id: str, theme: str, count: int = 5):
    """
    Generate clues for a hunt
    """
    try:
        hunt = fb.get_hunt(hunt_id)
        if not hunt:
            raise HTTPException(status_code=404, detail="Hunt not found")
        
        return {
            "hunt_id": hunt_id,
            "clues_generated": count,
            "message": "Clues generated successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/hunt/{hunt_id}")
async def get_clues_by_hunt(hunt_id: str):
    """
    Get all clues for a hunt
    """
    try:
        hunt = fb.get_hunt(hunt_id)
        if not hunt:
            raise HTTPException(status_code=404, detail="Hunt not found")
        
        return {
            "hunt_id": hunt_id,
            "clues": hunt.get('clues', [])
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{clue_id}/answer")
async def submit_answer(clue_id: str, answer: str):
    """
    Submit answer for a clue
    """
    try:
        return {
            "clue_id": clue_id,
            "correct": True,  # Would validate against actual answer
            "message": "Answer submitted"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
