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
    tickets = (
        db.query(Ticket)
        .filter(Ticket.created_by == user_id)
        .all()
    )

    for ticket in tickets:
        ticket.assigned_to_name = (
            ticket.assigned_to_user.full_name
            if ticket.assigned_to_user
            else None
        )

    return tickets


def get_all_tickets(db: Session):
    tickets = (
        db.query(Ticket)
        .order_by(Ticket.created_at.desc())
        .all()
    )

    for ticket in tickets:
        ticket.assigned_to_name = (
            ticket.assigned_to_user.full_name
            if ticket.assigned_to_user
            else None
        )

    return tickets


def assign_ticket(
    db: Session,
    ticket_id: int,
    employee_id: int,
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        return None

    ticket.assigned_to = employee_id

    db.commit()
    db.refresh(ticket)

    ticket.assigned_to_name = (
        ticket.assigned_to_user.full_name
        if ticket.assigned_to_user
        else None
    )

    return ticket


def update_ticket_status(
    db: Session,
    ticket_id: int,
    status: str,
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        return None

    ticket.status = status

    db.commit()
    db.refresh(ticket)

    ticket.assigned_to_name = (
        ticket.assigned_to_user.full_name
        if ticket.assigned_to_user
        else None
    )

    return ticket


def search_tickets(
    db: Session,
    status: str | None = None,
    priority: str | None = None,
    category: str | None = None,
):
    query = db.query(Ticket)

    if status:
        query = query.filter(Ticket.status == status)

    if priority:
        query = query.filter(Ticket.priority == priority)

    if category:
        query = query.filter(Ticket.category == category)

    tickets = query.order_by(Ticket.id).all()

    for ticket in tickets:
        ticket.assigned_to_name = (
            ticket.assigned_to_user.full_name
            if ticket.assigned_to_user
            else None
        )

    return tickets