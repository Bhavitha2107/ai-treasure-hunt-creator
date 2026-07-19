from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from io import BytesIO
from datetime import datetime
import io

class CertificateService:
    @staticmethod
    def generate_certificate(
        participant_name: str,
        hunt_title: str,
        position: str,
        date_issued: datetime,
        hunter_id: str = None
    ) -> bytes:
        """
        Generate PDF certificate for hunt participant
        position: 'winner' or 'participant'
        """
        try:
            buffer = BytesIO()
            doc = SimpleDocTemplate(buffer, pagesize=letter,
                                  topMargin=0.5*inch,
                                  bottomMargin=0.5*inch)
            
            story = []
            styles = getSampleStyleSheet()
            
            # Custom styles
            title_style = ParagraphStyle(
                'CustomTitle',
                parent=styles['Heading1'],
                fontSize=36,
                textColor=colors.HexColor('#0ea5e9'),
                spaceAfter=30,
                alignment=TA_CENTER,
                fontName='Helvetica-Bold'
            )
            
            subtitle_style = ParagraphStyle(
                'Subtitle',
                parent=styles['Normal'],
                fontSize=14,
                textColor=colors.HexColor('#64748b'),
                spaceAfter=20,
                alignment=TA_CENTER
            )
            
            name_style = ParagraphStyle(
                'NameStyle',
                parent=styles['Heading2'],
                fontSize=24,
                textColor=colors.HexColor('#1e293b'),
                spaceAfter=10,
                alignment=TA_CENTER,
                fontName='Helvetica-Bold'
            )
            
            # Title
            story.append(Spacer(1, 0.5*inch))
            story.append(Paragraph("🎯 Certificate of Achievement", title_style))
            story.append(Spacer(1, 0.3*inch))
            
            # Recipient
            story.append(Paragraph("This is to certify that", subtitle_style))
            story.append(Paragraph(participant_name, name_style))
            
            # Achievement
            position_text = "won the treasure hunt" if position == "winner" else "participated in the treasure hunt"
            story.append(Spacer(1, 0.2*inch))
            story.append(Paragraph(
                f"has successfully {position_text}",
                subtitle_style
            ))
            
            # Hunt title
            story.append(Paragraph(f"<b>{hunt_title}</b>", styles['Normal']))
            
            # Date
            story.append(Spacer(1, 0.3*inch))
            story.append(Paragraph(
                f"Issued on {date_issued.strftime('%B %d, %Y')}",
                subtitle_style
            ))
            
            # Build PDF
            doc.build(story)
            buffer.seek(0)
            return buffer.getvalue()
        except Exception as e:
            raise Exception(f"Error generating certificate: {str(e)}")
