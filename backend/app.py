import os
import socket
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routes.display import router as display_router
from routes.auth import router as auth_router
from routes.content import router as content_router
from routes.attach import router as attach_router
from routes.send import router as send_router
from routes.doc import router as doc_router

app = FastAPI()

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(display_router)
app.include_router(auth_router)
app.include_router(content_router)
app.include_router(attach_router)
app.include_router(send_router)
    
if __name__ == "__main__":
    import uvicorn
    import os
    
    port = int(os.environ.get("PORT", 8000))

    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=port
    )