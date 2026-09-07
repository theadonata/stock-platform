"""Shared test fixtures. No DB fixture yet — nothing under test touches the
DB until the first models land (auth & roles ticket)."""
import pytest
from fastapi.testclient import TestClient

from app.main import app as fastapi_app


@pytest.fixture()
def client():
    with TestClient(fastapi_app) as test_client:
        yield test_client
