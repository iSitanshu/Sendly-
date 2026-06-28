import socket
from fastapi import APIRouter

router = APIRouter()

try:
    socket.create_connection(("smtp.gmail.com", 587), timeout=10)
    print("SMTP reachable")
except Exception as e:
    print(e)