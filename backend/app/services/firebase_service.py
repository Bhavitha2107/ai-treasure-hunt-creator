import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
import json
from typing import Dict, Optional, List

class FirebaseService:
    def __init__(self):
        # Initialize Firebase
        if not firebase_admin.get_app():
            cred_dict = {
                "type": "service_account",
                "project_id": os.getenv("FIREBASE_PROJECT_ID"),
                "private_key_id": "key123",
                "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace('\\n', '\n'),
                "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
                "client_id": "123456789",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
        
        self.db = firestore.client()

    def create_hunt(self, hunt_data: Dict) -> str:
        """Create a new hunt in Firestore"""
        try:
            doc_ref = self.db.collection('hunts').document()
            hunt_data['hunt_id'] = doc_ref.id
            doc_ref.set(hunt_data)
            return doc_ref.id
        except Exception as e:
            raise Exception(f"Error creating hunt: {str(e)}")

    def get_hunt(self, hunt_id: str) -> Optional[Dict]:
        """Get hunt by ID"""
        try:
            doc = self.db.collection('hunts').document(hunt_id).get()
            return doc.to_dict() if doc.exists else None
        except Exception as e:
            raise Exception(f"Error getting hunt: {str(e)}")

    def update_hunt(self, hunt_id: str, data: Dict) -> bool:
        """Update hunt"""
        try:
            self.db.collection('hunts').document(hunt_id).update(data)
            return True
        except Exception as e:
            raise Exception(f"Error updating hunt: {str(e)}")

    def create_score(self, score_data: Dict) -> str:
        """Create a score record"""
        try:
            doc_ref = self.db.collection('scores').document()
            score_data['score_id'] = doc_ref.id
            doc_ref.set(score_data)
            return doc_ref.id
        except Exception as e:
            raise Exception(f"Error creating score: {str(e)}")

    def get_leaderboard(self, hunt_id: str, limit: int = 10) -> List[Dict]:
        """Get leaderboard for a hunt"""
        try:
            docs = self.db.collection('scores')\
                .where('hunt_id', '==', hunt_id)\
                .order_by('total_score', direction=firestore.Query.DESCENDING)\
                .limit(limit)\
                .stream()
            
            leaderboard = []
            for idx, doc in enumerate(docs, 1):
                data = doc.to_dict()
                data['rank'] = idx
                leaderboard.append(data)
            
            return leaderboard
        except Exception as e:
            raise Exception(f"Error getting leaderboard: {str(e)}")

    def create_certificate(self, cert_data: Dict) -> str:
        """Create a certificate record"""
        try:
            doc_ref = self.db.collection('certificates').document()
            cert_data['cert_id'] = doc_ref.id
            doc_ref.set(cert_data)
            return doc_ref.id
        except Exception as e:
            raise Exception(f"Error creating certificate: {str(e)}")

    def get_certificate(self, cert_id: str) -> Optional[Dict]:
        """Get certificate by ID"""
        try:
            doc = self.db.collection('certificates').document(cert_id).get()
            return doc.to_dict() if doc.exists else None
        except Exception as e:
            raise Exception(f"Error getting certificate: {str(e)}")
