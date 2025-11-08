from sqlalchemy import Column, String, Date, Text, TIMESTAMP, ForeignKey, Boolean, Numeric
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import declarative_base
import uuid
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "user"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    rank = Column(Text)
    employee_no = Column(Text, unique=True)
    roles = Column(ARRAY(Text), default=[])
    source = Column(Text, default="GD")
    source_doc_id = Column(Text)
    pushed_by = Column(Text)
    pushed_at = Column(TIMESTAMP, default=datetime.utcnow)
    record_hash = Column(Text)

class FlightSession(Base):
    __tablename__ = "flight_session"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    flight_no = Column(Text, nullable=False)
    date_utc = Column(Date, nullable=False)
    dep = Column(Text, nullable=False)
    arr = Column(Text, nullable=False)
    tail = Column(Text)
    aircraft_type = Column(Text)
    layout_id = Column(Text)
    status = Column(Text, default="planned")
    source = Column(Text, default="GD")
    source_doc_id = Column(Text)
    pushed_by = Column(Text)
    pushed_at = Column(TIMESTAMP, default=datetime.utcnow)
    record_hash = Column(Text)
    class PSRRequest(Base):
    __tablename__ = "psr_request"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    flight_session_id = Column(UUID(as_uuid=True), ForeignKey("flight_session.id"), nullable=False)
    seat = Column(Text, nullable=False)
    passenger_name = Column(Text, nullable=False)
    meal_code = Column(Text, nullable=False)
    title = Column(Text)
    delivered = Column(Boolean, default=False)
    comment = Column(Text)
    pushed_at = Column(TIMESTAMP, default=datetime.utcnow)
    source = Column(Text, default="Catrion")

    # relationships
    flight_session = relationship("FlightSession", backref="psr_requests")

