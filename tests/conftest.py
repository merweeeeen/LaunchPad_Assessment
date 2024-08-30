import asyncio

import pytest_asyncio
from beanie import init_beanie
from fastapi.testclient import TestClient
from httpx import AsyncClient
from motor.motor_asyncio import AsyncIOMotorClient

from app.conversations.schema import ConversationFull
from app.db import initiate_db
from app.main import app

from .test_db import initiate_test_db


@pytest_asyncio.fixture(name="test_db")
async def test_db():
    await initiate_test_db()
    yield


@pytest_asyncio.fixture(name="auth_client")
async def test_auth_client(test_db):  # Include test_db as a fixture dependency
    # Use AsyncClient for asynchronous testing
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client


# @pytest_asyncio.fixture(scope="function")
# async def event_loop():
#     """Create a new event loop for each test."""
#     loop = asyncio.new_event_loop()
#     yield loop
#     loop.close()
