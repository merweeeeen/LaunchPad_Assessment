from typing import Any
from uuid import UUID

from beanie import Document
from pydantic import BaseModel


class Description(BaseModel):
    description: dict[str, Any]


class APIError(Document):
    code: int
    message: str
    request: Description
    details: Description


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
