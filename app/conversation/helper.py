import os
from uuid import uuid4

from dotenv import load_dotenv
from openai import OpenAI

from .schema import ConversationFull, Description, Prompt, QueryRoleType

load_dotenv()


async def start_chat(payload, initiate_db):
    openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    completion = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": payload.query},
        ],
    )

    total_tokens = completion.usage.total_tokens
    tokens = completion.usage.model_dump()
    message = completion.choices[0].message

    # tentatively 'name' of conversation would be the initial prompt
    name = message.content
    await initiate_db()
    full_conversation = ConversationFull(
        id=uuid4(),
        name=name,
        tokens=total_tokens,
        params=Description(description=tokens),
        messages=[
            Prompt(role=QueryRoleType(role_type="user"), content=payload.query),
            Prompt(role=QueryRoleType(role_type=message.role), content=message.content),
        ],
    )
    await full_conversation.insert()

    return full_conversation


async def get_all_conversations(initiate_db):
    await initiate_db()
    retrieved_conversations = []

    for conversation in await ConversationFull.find().to_list():
        conversation = conversation.model_dump()
        del conversation["messages"]
        retrieved_conversations.append(conversation)
    return retrieved_conversations


async def get_a_conversation(id, initiate_db):
    await initiate_db()
    return await ConversationFull.find(ConversationFull.id == id).to_list()
