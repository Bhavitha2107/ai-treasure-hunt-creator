from fastapi import APIRouter, HTTPException
from ..services.firebase_service import FirebaseService
from ..services.certificate_service import CertificateService
from ..services.cloudinary_service import CloudinaryService
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/certificates", tags=["certificates"])
fb = FirebaseService()
cert_service = CertificateService()
cloud_service = CloudinaryService()

class CertificateRequest(BaseModel):
    hunt_id: str
    participant_name: str
    position: str  # 'winner' or 'participant'
    hunt_title: str

@router.post("/generate")
async def generate_certificate(cert_request: CertificateRequest):
    """
    Generate and upload certificate
    """
    try:
        # Generate PDF certificate
        pdf_bytes = CertificateService.generate_certificate(
            participant_name=cert_request.participant_name,
            hunt_title=cert_request.hunt_title,
            position=cert_request.position,
            date_issued=datetime.now()
        )
        
        # Upload to Cloudinary
        filename = f"cert_{cert_request.hunt_id}_{cert_request.participant_name.replace(' ', '_')}.pdf"
        pdf_url = cloud_service.upload_certificate(pdf_bytes, filename)
        
        # Save certificate record to Firebase
        cert_dict = {
            "hunt_id": cert_request.hunt_id,
            "user_id": "temp_user",  # Should come from auth
            "participant_name": cert_request.participant_name,
            "position": cert_request.position,
            "pdf_url": pdf_url,
            "issued_date": datetime.now(),
            "created_at": datetime.now()
        }
        
        cert_id = fb.create_certificate(cert_dict)
        
        return {
            "cert_id": cert_id,
            "pdf_url": pdf_url,
            "message": "Certificate generated successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{cert_id}")
async def get_certificate(cert_id: str):
    """
    Get certificate details
    """
    try:
        cert = fb.get_certificate(cert_id)
        if not cert:
            raise HTTPException(status_code=404, detail="Certificate not found")
        return cert
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
