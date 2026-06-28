from fastapi import APIRouter
from pydantic import BaseModel
import re

router = APIRouter()

class EmailRequest(BaseModel):
    email: str


@router.post("/auth")
def auth(data: EmailRequest):
    pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

    if re.match(pattern, data.email):
        return {
            "status": "success",
            "email": data.email
        }

    return {
        "status": "invalid",
        "message": "Invalid email"
    }



# import smtplib

# def verify_credentials(email, password):
#     if "@" not in email or not email.endswith(".com"):
#         return {
#             "status": "invalid",
#             "message": "The email format is incorrect or unsupported."
#         }

#     try: 
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.quit()
        
#         return {
#             "status": "success",
#             "message": f"Email {email} is valid and ready for use.",
#             "email": email,
#             "credential": password
#         }
#     except Exception as e:
#         # If login fails (or network error), return this status instead of just False
#         return {
#             "status": "false",
#             "message": "Authentication failed. Check your email, password, or App Password settings."
#         }



