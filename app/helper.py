import os
from openai import OpenAI
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from beanie import Document, Indexed, init_beanie
import asyncio
from typing import Optional
from .schema import (QueryRoleType, APIError, Prompt, Conversation, ConversationCall, ConversationFull, Description)

load_dotenv()  

async def chat():
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": "Write a haiku about recursion in programming."
            }
        ]
    )

    return completion

async def example():

    # Beanie uses Motor async client under the hood 
    client = AsyncIOMotorClient("mongodb://localhost:27017")

    # Initialize beanie with the Product document class
    await init_beanie(database=client.db_name, document_models=[Conversation, APIError, ConversationCall, ConversationFull])
    
    # Test DB call
    one_api_error = APIError(code = 400, message = 'Forbidden', request = Description(description = {"message": "test"}), details = Description(description = {"some": "details"}))
    
    await one_api_error.insert()