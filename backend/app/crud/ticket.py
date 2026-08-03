from sqlalchemy.orm import Session

from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate


def create_ticket(
    db: Session,
    ticket: TicketCreate,
    user_id: int,
):
    db_ticket = Ticket(
        title=ticket.title,
        description=ticket.description,
        priority=ticket.priority,
        category=ticket.category,
        status="OPEN",
        created_by=user_id,
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket


def get_my_tickets(
    db: Session,
    user_id: int,
):
    return (
        db.query(Ticket)
        .filter(Ticket.created_by == user_id)
        .all()
    )