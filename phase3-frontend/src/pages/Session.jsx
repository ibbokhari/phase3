import { useParams, NavLink, Routes, Route } from 'react-router-dom'
import PSRList from '../features/psr/PSRList.jsx'
import DutyBoard from '../features/duties/DutyBoard.jsx'
import SequenceView from '../features/sequence/SequenceView.jsx'
import ChatPane from '../features/chat/ChatPane.jsx'
import InventoryPanel from '../features/inventory/InventoryPanel.jsx'
import MenuBrowser from '../features/menus/MenuBrowser.jsx'
import AssistantPane from '../features/assistant/AssistantPane.jsx'

export default function Session(){
  const { sessionId } = useParams()
  return (
    <div className="page p">
      <h1>Flight Session: {sessionId}</h1>
      <div className="tabs">
        <NavLink to="">PSR</NavLink>
        <NavLink to="duties">Duties</NavLink>
        <NavLink to="sequence">Sequence</NavLink>
        <NavLink to="chat">Chat</NavLink>
        <NavLink to="inventory">Inventory</NavLink>
        <NavLink to="menus">Menus</NavLink>
        <NavLink to="assistant">Assistant</NavLink>
      </div>
      <Routes>
        <Route index element={<PSRList sessionId={sessionId} />} />
        <Route path="duties" element={<DutyBoard sessionId={sessionId} />} />
        <Route path="sequence" element={<SequenceView sessionId={sessionId} />} />
        <Route path="chat" element={<ChatPane sessionId={sessionId} />} />
        <Route path="inventory" element={<InventoryPanel sessionId={sessionId} />} />
        <Route path="menus" element={<MenuBrowser sessionId={sessionId} />} />
        <Route path="assistant" element={<AssistantPane sessionId={sessionId} />} />
      </Routes>
    </div>
  )
}
