import { useEffect, useState } from 'react'
import { get } from '../../lib/api'

export default function SequenceView({sessionId}){
  const [steps, setSteps] = useState([])
  useEffect(()=>{
    get(`/sessions/${encodeURIComponent(sessionId)}/sequence`).then(setSteps).catch(()=>setSteps([]))
  },[sessionId])
  return (
    <div>
      <h2>Service Sequence</h2>
      <ol>
        {steps.map(s=>(<li key={s.id}>{s.title} — T+{s.due_offset_min}m</li>))}
      </ol>
    </div>
  )
}
