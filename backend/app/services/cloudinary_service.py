import cloudinary
import cloudinary.uploader
from typing import Optional
import os

class CloudinaryService:
    def __init__(self):
        cloudinary.config(
            cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
            api_key=os.getenv("CLOUDINARY_API_KEY"),
            api_secret=os.getenv("CLOUDINARY_API_SECRET")
        )

    def upload_certificate(self, file_bytes: bytes, filename: str) -> str:
        """
        Upload certificate PDF to Cloudinary
        """
        try:
            result = cloudinary.uploader.upload(
                file_bytes,
                folder="certificates",
                resource_type="auto",
                public_id=filename.replace('.pdf', '')
            )
            return result['secure_url']
        except Exception as e:
            raise Exception(f"Error uploading certificate: {str(e)}")

    def upload_image(self, file_bytes: bytes, filename: str) -> str:
        """
        Upload image to Cloudinary
        """
        try:
            result = cloudinary.uploader.upload(
                file_bytes,
                folder="hunts",
                resource_type="image",
                public_id=filename
            )
            return result['secure_url']
        except Exception as e:
            raise Exception(f"Error uploading image: {str(e)}")

    def delete_file(self, public_id: str) -> bool:
        """
        Delete file from Cloudinary
        """
        try:
            cloudinary.uploader.destroy(public_id)
            return True
        except Exception as e:
            raise Exception(f"Error deleting file: {str(e)}")
