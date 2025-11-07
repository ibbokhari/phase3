import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [emp, setEmp] = useState('')
  const nav = useNavigate()
  const onLogin = () => {
    // TODO: replace with real auth
    localStorage.setItem('token', 'demo-token')
    nav('/join')
  }
  return (
    <div className="page p">
      <h1>Login</h1>
      <input placeholder="Employee No" value={emp} onChange={e=>setEmp(e.target.value)} />
      <button onClick={onLogin}>Login</button>
    </div>
  )
}
