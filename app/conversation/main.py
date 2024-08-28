from uuid import UUID

from fastapi import APIRouter

from app.db import initiate_db

from .helper import get_a_conversation, get_all_conversations, start_chat
from .schema import APIError, Conversation, ConversationPayload

router = APIRouter()


@router.post("/conversations")
async def create_conversation(payload: ConversationPayload):
    return await start_chat(payload, initiate_db)


@router.get("/conversations")
async def get_conversations() -> list[Conversation] | APIError:
    try:
        return await get_all_conversations(initiate_db)
    except:
        return APIError(code=500, message="Internal Server Error")


@router.get("/conversations/{id:uuid}")
async def get_conversation(id: UUID):
    try:
        if len(conversation := await get_a_conversation(id, initiate_db)) == 0:
            return APIError(code=404, message="Specified resource(s) was not found")
        else:
            return conversation
    except:
        return APIError(code=500, message="Internal Server Error")
