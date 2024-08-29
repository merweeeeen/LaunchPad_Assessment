from uuid import UUID

from fastapi import APIRouter

from .helper import existing_query, new_query
from .schema import ConversationFull, Prompt, PromptPayload

router = APIRouter()


@router.post("/queries/{id:uuid}")
async def send_prompt(id: UUID, prompt_body: PromptPayload):
    if prompt_body.exist:
        return await existing_query(id, prompt_body)
    return await new_query(id, prompt_body)
