from contextlib import asynccontextmanager

from app.queries.main import router as queries_router
from fastapi import FastAPI

from .db import initiate_db


@asynccontextmanager
async def init_db(app: FastAPI):
    await initiate_db()
    yield


app = FastAPI(lifespan=init_db)

app.include_router(queries_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=3001,
        reload=True,
    )
