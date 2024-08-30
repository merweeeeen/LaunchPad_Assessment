# Beanie uses Motor async client under the hood
from app.common.schema import ConversationFull
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://host.docker.internal:27017")


async def initiate_db():
    await init_beanie(database=client.launchpad, document_models=[ConversationFull])
