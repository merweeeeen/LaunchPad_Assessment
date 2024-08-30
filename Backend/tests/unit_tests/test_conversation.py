from uuid import UUID, uuid4

import pytest
from app.common.schema import (
    ConversationPayload,
    ConversationPut,
    Description,
    PromptPayload,
)
from fastapi import status
from httpx import AsyncClient

from tests.common.create_entry import create_db_entry


@pytest.mark.asyncio
async def test_create_conversation(
    auth_client: AsyncClient,
):
    payload = ConversationPayload(query="What is 1+2?").model_dump(mode="json")
    post_response = await auth_client.post("/conversations", json=payload)

    assert post_response.status_code == status.HTTP_201_CREATED
    payload = ConversationPayload(
        query="What is 1+2?", id=post_response.json()["_id"]
    ).model_dump(mode="json")
    post_response = await auth_client.post("/conversations", json=payload)
    assert post_response.status_code == status.HTTP_201_CREATED


@pytest.mark.asyncio
async def test_failed_create_conversation(
    auth_client: AsyncClient,
):
    payload = ConversationPayload(query="What is 1+2?", id=uuid4()).model_dump(
        mode="json"
    )
    post_response = await auth_client.post("/conversations", json=payload)

    assert post_response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.asyncio
async def test_get_conversations(
    auth_client: AsyncClient,
):
    id = await create_db_entry()

    get_all_response = await auth_client.get("/conversations")
    res = get_all_response.json()
    assert len(res) == 1
    assert get_all_response.status_code == 200

    get_one_response = await auth_client.get(f"/conversations/{id}")
    res = get_one_response.json()
    assert UUID(res["_id"]) == id
    assert get_one_response.status_code == 200


@pytest.mark.asyncio
async def test_failed_get_conversation(
    auth_client: AsyncClient,
):
    get_one_response = await auth_client.get(f"/conversations/{uuid4()}")
    assert get_one_response.status_code == 404


@pytest.mark.asyncio
async def test_update_conversation(
    auth_client: AsyncClient,
):
    id = await create_db_entry()
    payload = ConversationPut(
        name="Mock 2", params=Description(description=[])
    ).model_dump()
    update_response = await auth_client.put(f"/conversations/{id}", json=payload)
    assert update_response.status_code == 204


@pytest.mark.asyncio
async def test_failed_conversation(
    auth_client: AsyncClient,
):
    payload = ConversationPut(name="Mock 2").model_dump()
    update_response = await auth_client.put(f"/conversations/{uuid4()}", json=payload)

    assert update_response.status_code == 404


@pytest.mark.asyncio
async def test_failed_query(
    auth_client: AsyncClient,
):
    payload = PromptPayload(role="user", content="What is 1+2?", exist=True).model_dump(
        mode="json"
    )
    post_response = await auth_client.post(f"/queries/{uuid4()}", json=payload)
    assert post_response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.asyncio
async def test_delete_conversations(
    auth_client: AsyncClient,
):
    id = await create_db_entry()
    post_response = await auth_client.delete(f"/conversations/{id}")
    assert post_response.status_code == status.HTTP_204_NO_CONTENT


@pytest.mark.asyncio
async def test_delete_conversations_failed(
    auth_client: AsyncClient,
):
    post_response = await auth_client.delete(f"/conversations/{uuid4()}")
    assert post_response.status_code == status.HTTP_404_NOT_FOUND
