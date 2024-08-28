# Beanie uses Motor async client under the hood
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from .conversation.schema import ConversationFull

client = AsyncIOMotorClient("mongodb://localhost:27017")


async def initiate_db():
    await init_beanie(database=client.launchpad, document_models=[ConversationFull])
