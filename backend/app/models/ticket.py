from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Identity,
    Integer,
    String,
    Text,
)
from sqlalchemy.sql import func

from app.database.base import Base


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(
        Integer,
        Identity(start=1),
        primary_key=True,
    )

    title = Column(
        String(200),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    priority = Column(
        String(20),
        nullable=False,
        default="MEDIUM",
    )

    status = Column(
        String(20),
        nullable=False,
        default="OPEN",
    )

    category = Column(
        String(50),
        nullable=False,
    )

    created_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    assigned_to = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
    )

    created_at = Column(
        DateTime,
        server_default=func.current_timestamp(),
    )