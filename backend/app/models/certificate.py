from pydantic import BaseModel
from typing import Literal
from datetime import datetime

class CertificateBase(BaseModel):
    hunt_id: str
    user_id: str
    participant_name: str
    position: Literal["winner", "participant"]

class CertificateCreate(CertificateBase):
    pass

class Certificate(CertificateBase):
    cert_id: str
    pdf_url: str
    issued_date: datetime
    created_at: datetime

    class Config:
        from_attributes = True
