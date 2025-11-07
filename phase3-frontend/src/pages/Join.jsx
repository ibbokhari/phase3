import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Join(){
  const [flightNo, setFlightNo] = useState('SV123')
  const [position, setPosition] = useState('L1')
  const nav = useNavigate()
  const join = () => {
    // In real app: POST /sessions/:id/join with position
    nav(`/session/${encodeURIComponent(flightNo)}`)
  }
  return (
    <div className="page p">
      <h1>Join Flight</h1>
      <input placeholder="Flight No (e.g., SV123)" value={flightNo} onChange={e=>setFlightNo(e.target.value)} />
      <select value={position} onChange={e=>setPosition(e.target.value)}>
        <option value="L1">L1</option>
        <option value="R2">R2</option>
        <option value="GALLEY-J">Galley J</option>
      </select>
      <button onClick={join}>Enter</button>
    </div>
  )
}
