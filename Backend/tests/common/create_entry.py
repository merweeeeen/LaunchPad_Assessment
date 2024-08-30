from uuid import uuid4

from app.common.schema import (
    ConversationFull,
    Description,
    DescriptionParams,
    Messages,
    Prompt,
)


# Creating a conversation directly instead of invoking the API multiple times
async def create_db_entry():
    conversation_id = uuid4()
    full_conversation = ConversationFull(
        id=conversation_id,
        name="Mock Name",
        tokens=30,
        params=Description(
            description=[
                DescriptionParams(
                    id=uuid4(),
                    completion_tokens=10,
                    prompt_tokens=20,
                    total_tokens=30,
                )
            ]
        ),
        messages=[
            Messages(
                query_id=uuid4(),
                content=[
                    Prompt(role="user", content="Mock Content"),
                    Prompt(role="assistant", content="Mock Content"),
                ],
            )
        ],
    )

    await full_conversation.insert()

    return conversation_id
