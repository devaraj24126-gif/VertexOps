from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.ticket import Ticket
from app.models.user import User


def get_dashboard_stats(db: Session):
    return {
        "total_users": db.query(func.count(User.id)).scalar(),
        "active_users": db.query(func.count(User.id)).filter(User.is_active == True).scalar(),
        "inactive_users": db.query(func.count(User.id)).filter(User.is_active == False).scalar(),

        "total_tickets": db.query(func.count(Ticket.id)).scalar(),

        "open_tickets": db.query(func.count(Ticket.id))
        .filter(Ticket.status == "OPEN")
        .scalar(),

        "in_progress_tickets": db.query(func.count(Ticket.id))
        .filter(Ticket.status == "IN_PROGRESS")
        .scalar(),

        "resolved_tickets": db.query(func.count(Ticket.id))
        .filter(Ticket.status == "RESOLVED")
        .scalar(),

        "closed_tickets": db.query(func.count(Ticket.id))
        .filter(Ticket.status == "CLOSED")
        .scalar(),
    }