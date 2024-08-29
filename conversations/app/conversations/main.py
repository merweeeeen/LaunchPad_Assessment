from uuid import UUID

from fastapi import APIRouter, Response

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
async def create_conversation(
    payload: ConversationPayload, response: Response
) -> ConversationFull | APIError:
    try:
        if payload.id:
            if await ConversationFull.find_one(ConversationFull.id == payload.id):
                result = await existing_conversation(payload)
                response.status_code = 201
                return result

            response.status_code = 500
            return APIError(code=404, message="Conversation not found")

        result = await start_conversation(payload)
        response.status_code = 201
        return result
    except:
        response.status_code = 500
        return APIError(code=500, message="Internal Server Error")


@router.get("/conversations")
async def get_conversations(response: Response) -> list[Conversation] | APIError:
    try:
        result = await get_all_conversations()
        response.status_code = 200
        return result
    except Exception:
        response.status_code = 500
        return APIError(code=500, message="Internal Server Error")


@router.get("/conversations/{id:uuid}")
async def get_conversation_by_id(
    id: UUID, response: Response
) -> ConversationFull | APIError:
    try:
        if len(conversation := await get_a_conversation(id)) == 0:
            response.status_code = 404
            return APIError(code=404, message="Specified resource(s) was not found")
        else:
            response.status_code = 200
            return conversation
    except:
        response.status_code = 500
        return APIError(code=500, message="Internal Server Error")


@router.put("/conversations/{id:uuid}")
async def update_conversations(id: UUID, payload: ConversationPut, response: Response):
    try:
        # Invalid parameters would be handled by FastAPi and pydantic
        if not await get_a_conversation(id):
            response.status_code = 404
            return APIError(code=404, message="Specified resource(s) was not found")
        await update_a_conversation(id, payload)
        response.status_code = 204
    except:
        response.status_code = 500
        return APIError(code=500, message="Internal Server Error")
