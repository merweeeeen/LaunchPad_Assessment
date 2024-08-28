from fastapi import FastAPI, APIRouter
from .helper import chat, example

router = APIRouter()

@router.get("/")
async def root():
    await example()


