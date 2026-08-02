from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    full_name: str = Field(
        ...,
        min_length=3,
        max_length=100,
    )

    email: EmailStr

    username: str = Field(
        ...,
        min_length=3,
        max_length=50,
    )

    password: str = Field(
        ...,
        min_length=6,
        max_length=100,
    )


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    username: str
    role: str
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )