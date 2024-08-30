from app.common.schema import ConversationFull
from beanie import init_beanie
from mongomock_motor import AsyncMongoMockClient


async def initiate_test_db():
    client = AsyncMongoMockClient()
    await init_beanie(
        document_models=[ConversationFull], database=client.get_database(name="db")
    )
