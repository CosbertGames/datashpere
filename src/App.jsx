// src/App.jsx
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import AddPage from './pages/AddPage'
import ViewPage from './pages/ViewPage'
import EditPage from './pages/EditPage'
import UserDetailPage from './pages/UserDetailPage'

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
            Add New User
          </NavLink>
          <NavLink
            to="/view"
            className={({ isActive }) => (isActive ? 'active' : '')}
            end
          >
            View
          </NavLink>
          <h3 className='logo'>DATASPHERE</h3>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/view" replace />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
          <Route path="*" element={<Navigate to="/view" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}