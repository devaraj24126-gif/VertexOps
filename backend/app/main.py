from fastapi import FastAPI
from sqlalchemy import text

from app.api.auth import router as auth_router
from app.database.base import Base
from app.database.database import engine
from app.models import User, Ticket
from app.api.tickets import router as ticket_router
from app.api.users import router as users_router
from app.api.dashboard import router as dashboard_router

app = FastAPI(
    title="VertexOps API",
    version="1.0.0",
    description="Enterprise IT Ticket Management System",
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(ticket_router)
app.include_router(users_router)
app.include_router(dashboard_router)


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