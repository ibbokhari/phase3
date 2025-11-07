from fastapi import APIRouter, WebSocket, WebSocketDisconnect
router = APIRouter()
active = {}

@router.websocket("/ws/{flight_id}")
async def websocket_endpoint(ws: WebSocket, flight_id: str):
    await ws.accept()
    active.setdefault(flight_id, set()).add(ws)
    try:
        while True:
            msg = await ws.receive_json()
            for peer in active[flight_id]:
                await peer.send_json(msg)
    except WebSocketDisconnect:
        active[flight_id].remove(ws)
