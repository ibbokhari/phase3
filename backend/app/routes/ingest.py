from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from hashlib import sha256
from app.services.ingest_service import upsert_user, upsert_flight_session
from app.db.session import get_db

router = APIRouter(prefix="/ingest", tags=["ingest"])

def hashrec(obj):
    import json
    return sha256(json.dumps(obj, sort_keys=True).encode()).hexdigest()

@router.post("/gd")
def ingest_gd(payload: dict, db: Session = Depends(get_db)):
    gd = payload.get("general_declaration", {})
    flight = gd.get("flight", {})
    crew = gd.get("crew", [])
    fs_hash = hashrec(flight)
    fs_id, fs_action = upsert_flight_session(db, flight, fs_hash, "GD", gd.get("document_id"), gd.get("pushed_by"))
    stats = {"users": {"inserted":0,"updated":0,"skipped":0}}
    for c in crew:
        if not c.get("employee_no"): 
            stats["users"]["skipped"]+=1
            continue
        u_hash = hashrec(c)
        action = upsert_user(db, c, u_hash, "GD", gd.get("document_id"), gd.get("pushed_by"))
        stats["users"][action]+=1
    return {"ok": True, "flight_action": fs_action, "stats": stats}

@router.post("/catrion")
def ingest_catrion(payload: dict):
    return {"ok": True, "msg": "Catrion ingest placeholder ready."}
