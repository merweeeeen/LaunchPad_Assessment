from fastapi import FastAPI

from app.conversation.main import router as conversation_router

app = FastAPI()

app.include_router(conversation_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=3000,
        reload=True,
    )
