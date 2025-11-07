import { useEffect, useState } from 'react'
import { get, patch } from '../../lib/api'

export default function PSRList({sessionId}){
  const [rows, setRows] = useState([])
  useEffect(()=>{
    get(`/sessions/${encodeURIComponent(sessionId)}/psr`).then(setRows).catch(()=>setRows([]))
  },[sessionId])
  const markDelivered = async (id) => {
    await patch(`/psr/${id}`, { status: 'delivered' })
    setRows(rows=>rows.map(r=>r.id===id?{...r,status:'delivered'}:r))
  }
  return (
    <div>
      <h2>Special Passenger Requests</h2>
      <table className="table">
        <thead><tr><th>Seat</th><th>Name</th><th>Code</th><th>Status</th><th/></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id}>
              <td>{r.seat}</td><td>{r.pax_name}</td><td>{r.code}</td><td>{r.status}</td>
              <td>{r.status!=='delivered' && <button onClick={()=>markDelivered(r.id)}>Delivered</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
