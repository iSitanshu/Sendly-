from fastapi import APIRouter

router = APIRouter()

@router.post("/send_email")
def send_emali():
    