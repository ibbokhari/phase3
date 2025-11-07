import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Join from './pages/Join.jsx'
import Session from './pages/Session.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="topbar">
          <div className="brand">Phase3 Crew Portal</div>
          <div className="links">
            <NavLink to="/">Login</NavLink>
            <NavLink to="/join">Join</NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/session/:sessionId/*" element={<Session />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
