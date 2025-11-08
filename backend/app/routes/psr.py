from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.main import get_db
from app.db.models import PSRRequest
from datetime import datetime

router = APIRouter(prefix="/psr", tags=["PSR"])

@router.get("/")
def list_psr(flight_session_id: UUID, db: Session = Depends(get_db)):
    """Return all PSR records for a given flight session"""
    return db.query(PSRRequest).filter(
        PSRRequest.flight_session_id == flight_session_id
    ).order_by(PSRRequest.seat).all()

@router.post("/")
def add_psr(data: list[dict], db: Session = Depends(get_db)):
    """Bulk insert PSR rows (used by /ingest/catrion or test uploads)"""
    new_rows = []
    for d in data:
        row = PSRRequest(
            flight_session_id=d["flight_session_id"],
            seat=d["seat"],
            passenger_name=d["passenger_name"],
            meal_code=d["meal_code"],
            title=d.get("title"),
            delivered=False,
            comment=None,
            pushed_at=datetime.utcnow()
        )
        db.add(row)
        new_rows.append(row)
    db.commit()
    return {"ok": True, "inserted": len(new_rows)}

@router.patch("/{psr_id}")
def update_psr(psr_id: UUID, payload: dict, db: Session = Depends(get_db)):
    """Mark delivered or add comment"""
    psr = db.get(PSRRequest, psr_id)
    if not psr:
        return {"ok": False, "error": "Not found"}
    if "delivered" in payload:
        psr.delivered = payload["delivered"]
    if "comment" in payload:
        psr.comment = payload["comment"]
    db.commit()
    return {"ok": True, "id": psr_id}
