from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.crud.ticket import create_ticket, get_my_tickets
from app.database.database import get_db
from app.models.user import User
from app.schemas.ticket import TicketCreate, TicketResponse

router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"],
)


@router.post(
    "",
    response_model=TicketResponse,
    status_code=201,
)
def create_new_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_ticket(
        db,
        ticket,
        current_user.id,
    )


@router.get(
    "/my",
    response_model=list[TicketResponse],
)
def my_tickets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_my_tickets(
        db,
        current_user.id,
    )