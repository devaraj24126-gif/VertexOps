from fastapi import FastAPI
from sqlalchemy import text

from app.api.auth import router as auth_router
from app.database.base import Base
from app.database.database import engine
from app.models import User

app = FastAPI(
    title="VertexOps API",
    version="1.0.0",
    description="Enterprise IT Ticket Management System",
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to VertexOps API 🚀"
    }


@app.get("/health")
def health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1 FROM DUAL"))

    return {
        "status": "Healthy",
        "database": "Connected"
    }