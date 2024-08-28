from typing import Optional, Any
from pydantic import BaseModel
from beanie import Document
from uuid import UUID, uuid4


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
    
class Conversation(Document):
    id: UUID
    name: str
    params: Description
    tokens: int
    
class ConversationFull(Conversation):
    meesages: Prompt
    
class ConversationCall():
    name: str
    params: Description
    
