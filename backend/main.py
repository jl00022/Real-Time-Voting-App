from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import redis
import api

app = FastAPI()

# Allow the Vite dev server (default port 5173) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis connection used by api_new.py's routes (decode_responses=True so
# hget/hgetall return str instead of bytes).
api.r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)

app.include_router(api.router)
