from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.common.db import initiate_db
from app.conversations.main import router as conversation_router
from app.queries.main import router as queries_router


@asynccontextmanager
async def init_db(app: FastAPI):
    await initiate_db()
    yield


app = FastAPI(title="Conversations", lifespan=init_db)

app.include_router(conversation_router)
app.include_router(queries_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=3000,
        reload=True,
    )
