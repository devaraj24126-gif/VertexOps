from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_users: int
    active_users: int
    inactive_users: int

    total_tickets: int
    open_tickets: int
    in_progress_tickets: int
    resolved_tickets: int
    closed_tickets: int