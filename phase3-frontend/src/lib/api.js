const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(method, path, body){
  const headers = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem('token')
  if(token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, {
    method, headers, body: body?JSON.stringify(body):undefined
  })
  if(!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const get = (p)=>request('GET', p)
export const post = (p,b)=>request('POST', p, b)
export const patch = (p,b)=>request('PATCH', p, b)
