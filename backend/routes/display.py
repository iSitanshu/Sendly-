from fastapi import APIRouter 
from fastapi.responses import PlainTextResponse

router = APIRouter()

@router.get('/', response_class=PlainTextResponse)
def display_text():
    return "Hello world! This is Backroom"