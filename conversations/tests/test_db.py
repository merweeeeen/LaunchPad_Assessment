# Beanie uses Motor async client under the hood
from app.conversations.schema import ConversationFull
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://localhost:27017")


async def initiate_test_db():
    await init_beanie(database=client.testdb, document_models=[ConversationFull])
