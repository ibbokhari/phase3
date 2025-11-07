import { useEffect, useState } from 'react'
import { connectWS, sendWS } from '../../lib/ws'

export default function ChatPane({sessionId}){
  const [msgs, setMsgs] = useState([])
  const [text, setText] = useState('')

  useEffect(()=>{
    connectWS(sessionId, (msg)=>{
      if(msg.type === 'chat.message') setMsgs(m=>[...m, msg.data])
    })
  },[sessionId])

  const send = () => {
    if(!text.trim()) return
    sendWS('chat.message', { text, ts: new Date().toISOString() })
    setText('')
  }

  return (
    <div>
      <h2>Live Chat</h2>
      <div className="chat-box">
        {msgs.map((m,i)=>(<div key={i} className="bubble">{m.text}</div>))}
      </div>
      <div className="row">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type message..." />
        <button onClick={send}>Send</button>
      </div>
    </div>
  )
}
