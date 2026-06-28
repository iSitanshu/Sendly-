from fastapi import APIRouter
from pydantic import BaseModel

from services.detect_placeholder import detect_placeholder

router = APIRouter()

class EmailContent(BaseModel):
    subject: str
    body: str 

@router.post("/content")
def check_content(data: EmailContent):

    email_subject = data.subject
    email_content = data.body

    placeholder = detect_placeholder(email_subject, email_content)

    return placeholder
    