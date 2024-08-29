import asyncio
import os
from uuid import uuid4

from dotenv import load_dotenv
from openai import OpenAI

from .schema import ConversationFull, Description, DescriptionParams, Messages, Prompt

load_dotenv()


async def llm_call(body, history=None):
    openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    completion = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": f"""
                You are a helpful assistant.

                The previous history is as follows:
                {history}
                If the history is 'None' take it as a new conversation
             """,
            },
            {"role": body.role, "content": body.content},
        ],
    )

    return completion


async def new_query(id, body):
    llm_response = await llm_call(body)

    total_tokens = llm_response.usage.total_tokens
    message = llm_response.choices[0].message

    # tentatively 'name' of conversation would be the initial prompt
    query_id = uuid4()
    conversation = await ConversationFull.find_one(ConversationFull.id == id)
    print(conversation.messages)
    tokens = llm_response.usage
    await conversation.set(
        {
            "tokens": total_tokens + conversation.tokens,
            "params": Description(
                description=[
                    DescriptionParams(
                        id=query_id,
                        completion_tokens=tokens.completion_tokens,
                        prompt_tokens=tokens.prompt_tokens,
                        total_tokens=tokens.total_tokens,
                    )
                ]
            ),
            "messages": [
                Messages(
                    query_id=query_id,
                    content=[
                        Prompt(role="user", content=body.content),
                        Prompt(role=message.role, content=message.content),
                    ],
                )
            ],
        }
    )
    print(await ConversationFull.find_one(ConversationFull.id == id))

    return query_id


async def existing_query(id, body):
    conversation = await ConversationFull.find_one(ConversationFull.id == id)
    messages = conversation.messages
    llm_response = await llm_call(body, history=messages)

    total_tokens = llm_response.usage.total_tokens
    message = llm_response.choices[0].message

    # tentatively 'name' of conversation would be the initial prompt
    query_id = uuid4()
    print(conversation.messages)
    params = conversation.params.description
    tokens = llm_response.usage
    desc_params = DescriptionParams(
        id=query_id,
        completion_tokens=tokens.completion_tokens,
        prompt_tokens=tokens.prompt_tokens,
        total_tokens=tokens.total_tokens,
    )
    params.append(desc_params)
    messages.append(
        Messages(
            query_id=query_id,
            content=[
                Prompt(role="user", content=body.content),
                Prompt(role=message.role, content=message.content),
            ],
        )
    )
    await conversation.set(
        {
            "tokens": total_tokens + conversation.tokens,
            "params": Description(description=params),
            "messages": messages,
        }
    )
    print(await ConversationFull.find_one(ConversationFull.id == id))

    return query_id
