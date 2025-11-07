import { useEffect, useState } from 'react'
import { get } from '../../lib/api'

export default function MenuBrowser({sessionId}){
  const [items, setItems] = useState([])
  useEffect(()=>{
    get(`/sessions/${encodeURIComponent(sessionId)}/menus?cabin=J`).then(setItems).catch(()=>setItems([]))
  },[sessionId])
  return (
    <div>
      <h2>Menus</h2>
      <div className="grid">
        {items.map(m=>(
          <div key={m.id} className="card">
            <h3>{m.name}</h3>
            <p>{m.description}</p>
            {m.allergens?.length>0 && <small>Allergens: {m.allergens.join(', ')}</small>}
          </div>
        ))}
      </div>
    </div>
  )
}
