from uuid import UUID

from fastapi import APIRouter, Response

from app.common.schema import APIError, ConversationFull, PromptPayload

from .helper import existing_query, new_query

router = APIRouter(prefix="/queries")


@router.post("/{id:uuid}")
async def send_prompt(id: UUID, prompt_body: PromptPayload, response: Response):
    try:
        if prompt_body.exist:
            if not await ConversationFull.find_one(ConversationFull.id == id):
                return APIError(code=404, message="Specified resource(s) was not found")
            result = await existing_query(id, prompt_body)
            response.status_code = 201
            return result
        return await new_query(id, prompt_body)
    except Exception as e:
        response.status_code = 422
        return APIError(code=422, message="Unable to create resource")
