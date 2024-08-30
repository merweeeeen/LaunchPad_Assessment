# Not done due to errors with the DB connection after every test case
import pytest
from app.common.schema import ConversationFull, ConversationPayload
from fastapi import status
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_conversation(
    auth_client: AsyncClient,
):  # Use the async test client fixture
    payload = ConversationPayload(query="What is 1+2?").model_dump(mode="json")
    post_response = await auth_client.post(
        "/conversations", json=payload
    )  # Use await with AsyncClient
    assert post_response.status_code == status.HTTP_200_OK


@pytest.mark.asyncio
async def test_get_all_conversations(
    auth_client: AsyncClient,
):  # Use the async test client fixture
    get_all_response = await auth_client.get("/conversations/")
    res = get_all_response.json()
    assert len(res) > 1


@pytest.mark.asyncio
async def test_get_one_conversations(auth_client: AsyncClient):
    payload = ConversationPayload(query="What is 1+2?").model_dump(mode="json")
    post_response = await auth_client.post(
        "/conversations", json=payload
    )  # Use await with AsyncClient
    assert post_response.status_code == status.HTTP_200_OK

    get_all_response = auth_client.get(f'/conversations/{post_response.json()["_id"]}')
    res = get_all_response.json()
    assert len(res) == 1
