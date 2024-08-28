from typing import Any, Union
from uuid import UUID

from beanie import Document
from pydantic import BaseModel, Field


class Description(BaseModel):
    description: dict[str, Any]


class APIError(BaseModel):
    code: int = Field(description="API Error code associated with the error")
    message: str = Field(description="Error message associated with the error")
    request: Description | None = Field(
        None, description="Request details associated with the error"
    )
    details: Description | None = Field(
        None, description="Other details associated with the error"
    )


class QueryRoleType(BaseModel):
    role_type: str


class Prompt(BaseModel):
    role: QueryRoleType
    content: str


class Conversation(BaseModel):
    id: UUID
    name: str
    params: Description
    tokens: int


class ConversationFull(Conversation, Document):
    messages: list[Prompt]


class ConversationCall(BaseModel):
    name: str
    params: Description


class ConversationPayload(BaseModel):
    query: str
