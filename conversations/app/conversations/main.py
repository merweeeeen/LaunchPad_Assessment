from uuid import UUID

from fastapi import APIRouter, Depends

from .helper import (
    existing_conversation,
    get_a_conversation,
    get_all_conversations,
    start_conversation,
    update_a_conversation,
)
from .schema import (
    APIError,
    Conversation,
    ConversationFull,
    ConversationPayload,
    ConversationPut,
)

router = APIRouter()


@router.post("/conversations")
async def create_conversation(payload: ConversationPayload):
    try:
        if payload.id:
            if await ConversationFull.find_one(ConversationFull.id == payload.id):
                return await existing_conversation(payload)
            return APIError(code=404, message="Conversation not found")
        return await start_conversation(payload)
    except:
        return APIError(code=500, message="Internal Server Error")


@router.get("/conversations")
async def get_conversations() -> list[Conversation] | APIError:
    try:
        return await get_all_conversations()
    except Exception as error:
        return APIError(code=500, message="Internal Server Error")


@router.get("/conversations/{id:uuid}")
async def get_conversation_by_id(id: UUID):
    try:
        if len(conversation := await get_a_conversation(id)) == 0:
            return APIError(code=404, message="Specified resource(s) was not found")
        else:
            return conversation
    except:
        return APIError(code=500, message="Internal Server Error")


@router.put("/conversations/{id:uuid}")
async def update_conversations(id: UUID, payload: ConversationPut):
    try:
        # Invalid parameters would be handled by FastAPi and pydantic
        if not await get_a_conversation(id):
            return APIError(code=404, message="Specified resource(s) was not found")
        return await update_a_conversation(id, payload)
    except:
        return APIError(code=500, message="Internal Server Error")
