from fastapi import APIRouter
from pydantic import BaseModel

from services.check_auth import verify_credentials

router = APIRouter()

class EmailCredential(BaseModel):
    email: str
    credentail: str

@router.post("/auth")
def check_email(data: EmailCredential):

    # send the email and credentails to the function check and return the response
    user_email = data.email
    user_credential = data.credentail

    check = verify_credentials(user_email, user_credential)
    return check

