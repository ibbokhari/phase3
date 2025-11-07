let socket

export function connectWS(sessionId, onMessage){
  const WS_BASE = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'
  socket = new WebSocket(`${WS_BASE}/ws/${encodeURIComponent(sessionId)}`)
  socket.onmessage = (e)=>{
    try { onMessage(JSON.parse(e.data)) } catch {}
  }
}

export function sendWS(type, data){
  if(socket && socket.readyState === 1){
    socket.send(JSON.stringify({ type, data }))
  }
}
