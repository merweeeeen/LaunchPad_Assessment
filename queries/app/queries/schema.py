from typing import Any, Literal
from uuid import UUID

from beanie import Document
from pydantic import BaseModel, Field


class Prompt(BaseModel):
    role: Literal["assistant", "user", "system", "function"] = Field(
        description="Query Role Type"
    )
    content: str


class PromptPayload(Prompt):
    exist: bool


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


class Messages(BaseModel):
    query_id: UUID
    content: list[Prompt]


class ConversationFull(Conversation, Document):
    messages: list[Messages] | None
