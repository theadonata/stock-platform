"""Aggregates all v1 routers into one, mounted once in app.main. Empty for
now — the first versioned endpoints land with the auth & roles ticket."""
from fastapi import APIRouter

api_router = APIRouter()
