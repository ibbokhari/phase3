import { useEffect, useState } from 'react'
import { get, post } from '../../lib/api'

export default function InventoryPanel({sessionId}){
  const [items, setItems] = useState([])
  useEffect(()=>{
    get(`/sessions/${encodeURIComponent(sessionId)}/inventory`).then(setItems).catch(()=>setItems([]))
  },[sessionId])
  const adj = async (id, delta) => {
    await post(`/inventory/${id}/txn`, { delta, reason: delta>0?'restock':'served' })
    setItems(items=>items.map(i=>i.id===id?{...i,current_qty:(Number(i.current_qty)||0)+delta}:i))
  }
  return (
    <div>
      <h2>Inventory</h2>
      <table className="table">
        <thead><tr><th>Area</th><th>SKU</th><th>Name</th><th>Qty</th><th/></tr></thead>
        <tbody>
          {items.map(it=>(
            <tr key={it.id}>
              <td>{it.area}</td><td>{it.sku}</td><td>{it.name}</td><td>{it.current_qty}</td>
              <td>
                <button onClick={()=>adj(it.id, -1)}>-1</button>
                <button onClick={()=>adj(it.id, +1)}>+1</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
