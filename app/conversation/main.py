from fastapi import APIRouter

from app.db import initiate_beanie

from .helper import start_chat
from .schema import ConversationPayload

router = APIRouter()


@router.post("/conversation")
async def create_conversation(payload: ConversationPayload):
    return await start_chat(payload, initiate_beanie)
