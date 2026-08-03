from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import (
    get_current_user,
    require_admin,
)
from app.crud.ticket import (
    create_ticket,
    get_my_tickets,
    get_all_tickets,
    assign_ticket,
    update_ticket_status,
)
from app.database.database import get_db
from app.models.user import User
from app.schemas.ticket import (
    TicketAssign,
    TicketCreate,
    TicketResponse,
    TicketStatusUpdate,
)
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


@router.get(
    "",
    response_model=list[TicketResponse],
)
def all_tickets(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return get_all_tickets(db)


@router.put(
    "/{ticket_id}/assign",
    response_model=TicketResponse,
)
def assign_ticket_to_employee(
    ticket_id: int,
    assignment: TicketAssign,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    ticket = assign_ticket(
        db,
        ticket_id,
        assignment.assigned_to,
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found",
        )

    return ticket


@router.put(
    "/{ticket_id}/status",
    response_model=TicketResponse,
)
def update_status(
    ticket_id: int,
    status: TicketStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    ticket = update_ticket_status(
        db,
        ticket_id,
        status.status,
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found",
        )

    return ticket