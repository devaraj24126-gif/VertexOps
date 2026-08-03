from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class TicketCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    description: str = Field(..., min_length=10)
    priority: str = Field(..., examples=["LOW", "MEDIUM", "HIGH"])
    category: str = Field(..., examples=["Hardware", "Software", "Network"])


class TicketResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    status: str
    category: str
    created_by: int
    assigned_to: int | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)