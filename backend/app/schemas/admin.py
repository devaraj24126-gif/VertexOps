from datetime import datetime

from pydantic import BaseModel, ConfigDict

from pydantic import Field



class UserListResponse(BaseModel):
    id: int
    full_name: str
    email: str
    username: str
    role: str
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserRoleUpdate(BaseModel):
    role: str = Field(
        ...,
        examples=["ADMIN", "EMPLOYEE"],
    )

class UserActiveUpdate(BaseModel):
    is_active: bool