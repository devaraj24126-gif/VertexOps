from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import require_admin
from app.crud.dashboard import get_dashboard_stats
from app.database.database import get_db
from app.models.user import User
from app.schemas.dashboard import DashboardStats

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/stats",
    response_model=DashboardStats,
)
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return get_dashboard_stats(db)