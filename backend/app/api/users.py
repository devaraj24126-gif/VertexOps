from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import require_admin
from app.crud.user import (
    get_all_users,
    update_user_role,
    update_user_active,
)
from app.database.database import get_db
from app.models.user import User

from app.schemas.admin import (
    UserListResponse,
    UserRoleUpdate,
    UserActiveUpdate,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get(
    "",
    response_model=list[UserListResponse],
)
def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return get_all_users(db)

@router.put(
    "/{user_id}/role",
    response_model=UserListResponse,
)
def change_role(
    user_id: int,
    role: UserRoleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    user = update_user_role(
        db,
        user_id,
        role.role,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user


@router.put(
    "/{user_id}/active",
    response_model=UserListResponse,
)
def update_active_status(
    user_id: int,
    active: UserActiveUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    user = update_user_active(
        db,
        user_id,
        active.is_active,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user