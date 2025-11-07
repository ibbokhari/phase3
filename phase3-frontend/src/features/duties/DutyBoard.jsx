import { useEffect, useState } from 'react'
import { get } from '../../lib/api'

export default function DutyBoard({sessionId}){
  const [duties, setDuties] = useState([])
  useEffect(()=>{
    get(`/sessions/${encodeURIComponent(sessionId)}/duties`).then(setDuties).catch(()=>setDuties([]))
  },[sessionId])
  return (
    <div>
      <h2>Duty Assignment</h2>
      <ul>
        {duties.map(d=>(<li key={d.id}>{d.title} — {d.owner_role} [{d.zone}]</li>))}
      </ul>
    </div>
  )
}
