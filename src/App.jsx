// src/App.jsx
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import AddPage from './pages/AddPage'
import ViewPage from './pages/ViewPage'
import EditPage from './pages/EditPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        {/* Navigation */}
        <nav className="nav">
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? 'active' : '')}
            end
          >
            Add/Create
          </NavLink>
          <NavLink
            to="/view"
            className={({ isActive }) => (isActive ? 'active' : '')}
            end
          >
            View
          </NavLink>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/view" replace />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="*" element={<Navigate to="/view" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}