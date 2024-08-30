from typing import Any, Literal
from uuid import UUID

from beanie import Document
from pydantic import BaseModel, Field


class Description(BaseModel):
    description: dict[str, Any] | list[Any] | None


class APIError(BaseModel):
    code: int = Field(description="API Error code associated with the error")
    message: str = Field(description="Error message associated with the error")
    request: Description | None = Field(
        None, description="Request details associated with the error"
    )
    details: Description | None = Field(
        None, description="Other details associated with the error"
    )


class DescriptionParams(BaseModel):
    id: UUID
    completion_tokens: int
    prompt_tokens: int
    total_tokens: int


class Description(BaseModel):
    description: list[DescriptionParams] | None


class Conversation(BaseModel):
    id: UUID
    name: str
    params: Description
    tokens: int


class Prompt(BaseModel):
    role: Literal["assistant", "user", "system", "function"] = Field(
        description="Query Role Type"
    )
    content: str


class Messages(BaseModel):
    query_id: UUID
    content: list[Prompt]


class ConversationFull(Conversation, Document):
    messages: list[Messages] | None


class ConversationPut(BaseModel):
    name: str | None = Field(None)
    params: Description | None = Field(None)


class ConversationPost(BaseModel):
    name: str
    params: Description | None = Field(None)


class ConversationPayload(BaseModel):
    query: str
    id: UUID | None = Field(
        default=None,
        title="ID of conversation to maintain history and provide context",
        description="Uses to build context to use conversation as chat between human and ai",
    )


class PromptPayload(Prompt):
    exist: bool
