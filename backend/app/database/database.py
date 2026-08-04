from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings



# ----------------------------
# Choose database automatically
# ----------------------------

if settings.DATABASE_URL:
    
    DATABASE_URL = settings.DATABASE_URL
else:
    
    DATABASE_URL = (
        f"oracle+oracledb://{settings.DB_USERNAME}:"
        f"{settings.DB_PASSWORD}"
        f"@{settings.DB_HOST}:{settings.DB_PORT}"
        f"/?service_name={settings.DB_SERVICE}"
    )

engine = create_engine(
    DATABASE_URL,
    echo=True,
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()