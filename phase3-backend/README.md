# Phase 3 Backend (FastAPI)

## Run locally
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Access: http://localhost:8000/docs

## Database
Edit `alembic.ini` or env var `DATABASE_URL` for Postgres.

## Routes
- `/ingest/gd` : Ingest General Declaration JSON
- `/ingest/catrion` : Ingest Catrion payloads
- `/ws/{flight_id}` : WebSocket per flight session
- `/info` : Service info endpoint
