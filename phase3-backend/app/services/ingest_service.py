from sqlalchemy import select
from app.db.models import User, FlightSession

def upsert_user(db, u, record_hash, source, source_doc_id, pushed_by):
    existing = db.execute(select(User).where(User.employee_no == u["employee_no"])).scalar_one_or_none()
    if existing:
        if existing.record_hash == record_hash:
            return "skipped"
        for k,v in u.items(): setattr(existing, k, v)
        existing.record_hash = record_hash
        existing.source, existing.source_doc_id, existing.pushed_by = source, source_doc_id, pushed_by
        db.commit()
        return "updated"
    db.add(User(**u, record_hash=record_hash, source=source, source_doc_id=source_doc_id, pushed_by=pushed_by))
    db.commit()
    return "inserted"

def upsert_flight_session(db, fs, record_hash, source, source_doc_id, pushed_by):
    existing = db.execute(select(FlightSession).where(
        FlightSession.flight_no == fs.get("flight_no"),
        FlightSession.date_utc == fs.get("date_utc"),
        FlightSession.tail == fs.get("tail")
    )).scalar_one_or_none()
    if existing:
        if existing.record_hash == record_hash:
            return existing.id, "skipped"
        for k,v in fs.items(): setattr(existing, k, v)
        existing.record_hash = record_hash
        existing.source, existing.source_doc_id, existing.pushed_by = source, source_doc_id, pushed_by
        db.commit()
        return existing.id, "updated"
    new_fs = FlightSession(**fs, record_hash=record_hash, source=source, source_doc_id=source_doc_id, pushed_by=pushed_by)
    db.add(new_fs)
    db.commit()
    return new_fs.id, "inserted"
