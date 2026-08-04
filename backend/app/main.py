from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
from app.api.tickets import router as ticket_router
from app.api.users import router as users_router

from app.database.base import Base
from app.database.database import engine

from app.models import User, Ticket

app = FastAPI(
    title="VertexOps API",
    version="1.0.0",
    description="Enterprise IT Ticket Management System",
)

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Create Database Tables
# -----------------------------
Base.metadata.create_all(bind=engine)

# -----------------------------
# Register Routers
# -----------------------------
app.include_router(auth_router)
app.include_router(ticket_router)
app.include_router(users_router)
app.include_router(dashboard_router)

# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def root():
    return {
        "message": "Welcome to VertexOps API 🚀"
    }


# -----------------------------
# Health Check
# -----------------------------
@app.get("/health")
def health():
    try:
        with engine.connect() as connection:

            if engine.dialect.name == "oracle":
                connection.execute(text("SELECT 1 FROM DUAL"))
            else:
                connection.execute(text("SELECT 1"))

        return {
            "status": "Healthy",
            "database": engine.dialect.name,
            "database_url": str(engine.url),
        }

    except Exception as e:
        return {
            "status": "Unhealthy",
            "database": engine.dialect.name,
            "database_url": str(engine.url),
            "error": str(e),
        }