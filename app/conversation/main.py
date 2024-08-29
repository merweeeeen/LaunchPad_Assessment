from uuid import UUID

from fastapi import APIRouter, Depends

from app.db import initiate_db

from .helper import get_a_conversation, get_all_conversations, start_conversation
from .schema import APIError, Conversation, ConversationPayload

router = APIRouter()


@router.post("/conversations")
async def create_conversation(payload: ConversationPayload, db=initiate_db):
    return await start_conversation(payload, db)


@router.get("/conversations")
async def get_conversations(db=initiate_db) -> list[Conversation] | APIError:
    try:
        print("Conversation: Here")
        return await get_all_conversations(db)
    except Exception as error:
        print("Conversastion: Not here")
        print("an error occured: ", error)
        return APIError(code=500, message="Internal Server Error")


@router.get("/conversations/{id:uuid}")
async def get_conversation_by_id(id: UUID, db: initiate_db):
    try:
        if len(conversation := await get_a_conversation(id, db)) == 0:
            return APIError(code=404, message="Specified resource(s) was not found")
        else:
            return conversation
    except:
        return APIError(code=500, message="Internal Server Error")
