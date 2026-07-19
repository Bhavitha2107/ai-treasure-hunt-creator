import qrcode
from io import BytesIO
import base64
from typing import Tuple

class QRService:
    @staticmethod
    def generate_qr_code(data: str, size: int = 300) -> str:
        """
        Generate QR code and return as base64 string
        """
        try:
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_H,
                box_size=10,
                border=4,
            )
            qr.add_data(data)
            qr.make(fit=True)
            
            img = qr.make_image(fill_color="black", back_color="white")
            img = img.resize((size, size))
            
            # Convert to base64
            buffer = BytesIO()
            img.save(buffer, format="PNG")
            img_str = base64.b64encode(buffer.getvalue()).decode()
            return f"data:image/png;base64,{img_str}"
        except Exception as e:
            raise Exception(f"Error generating QR code: {str(e)}")

    @staticmethod
    def get_progressive_qr(data: str, reveal_percentage: int) -> dict:
        """
        Generate progressive QR code that reveals bit by bit
        reveal_percentage: 0-100
        """
        try:
            pixel_size = max(1, int(10 * (100 - reveal_percentage) / 100))
            qr_data = QRService.generate_qr_code(data)
            
            return {
                "qr_code": qr_data if reveal_percentage == 100 else None,
                "reveal_percentage": reveal_percentage,
                "pixel_size": pixel_size,
                "is_fully_revealed": reveal_percentage == 100
            }
        except Exception as e:
            raise Exception(f"Error generating progressive QR: {str(e)}")
