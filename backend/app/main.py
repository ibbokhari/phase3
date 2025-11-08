from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import ingest, ws, psr

app = FastAPI(title="Phase 3 Backend", version="0.1")

# ===== CORS Settings =====
origins = [
    "http://localhost:5173",
    "https://blue-pebble-0c9c2331e.3.azurestaticapps.net",
    "https://your-production-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== Routers =====
app.include_router(ingest.router)
app.include_router(ws.router)
app.include_router(psr.router)

# ===== Info Endpoint =====
@app.get("/info")
def info():
    return {"ok": True, "service": "Phase 3 Backend", "version": "0.1"}
