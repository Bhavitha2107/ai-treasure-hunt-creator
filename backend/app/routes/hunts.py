from fastapi import APIRouter, HTTPException, Depends, Query
from ..models.hunt import HuntCreate, Hunt
from ..services.gemini_service import GeminiService
from ..services.firebase_service import FirebaseService
from datetime import datetime
from typing import List

router = APIRouter(prefix="/hunts", tags=["hunts"])
gf = GeminiService()
fb = FirebaseService()

@router.post("/create")
async def create_hunt(hunt_data: HuntCreate):
    """
    Create a new treasure hunt
    """
    try:
        # Validate clues count
        if hunt_data.num_clues > 8:
            raise HTTPException(status_code=400, detail="Maximum 8 clues allowed")
        
        # Generate clues using Gemini
        clues = gf.generate_clues(
            theme=hunt_data.theme,
            age_group=hunt_data.age_group,
            location_type=hunt_data.location_type,
            academic=hunt_data.academic,
            num_clues=hunt_data.num_clues,
            difficulty=hunt_data.difficulty,
            hunt_title=hunt_data.title
        )
        
        # Prepare hunt data
        hunt_dict = hunt_data.dict()
        hunt_dict['clues'] = clues
        hunt_dict['status'] = 'active'
        hunt_dict['creator_id'] = 'temp_user'  # Should come from auth
        hunt_dict['created_at'] = datetime.now()
        hunt_dict['updated_at'] = datetime.now()
        hunt_dict['max_clues'] = 8
        
        # Save to Firebase
        hunt_id = fb.create_hunt(hunt_dict)
        
        return {
            "hunt_id": hunt_id,
            "title": hunt_data.title,
            "clues": clues,
            "status": "created",
            "message": "Hunt created successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{hunt_id}")
async def get_hunt(hunt_id: str):
    """
    Get hunt details by ID
    """
    try:
        hunt = fb.get_hunt(hunt_id)
        if not hunt:
            raise HTTPException(status_code=404, detail="Hunt not found")
        return hunt
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
async def list_hunts():
    """
    List all available hunts
    """
    try:
        # This would typically fetch from Firestore
        return {"hunts": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
