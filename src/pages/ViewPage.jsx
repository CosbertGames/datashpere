// src/pages/ViewPage.jsx
import { useEffect, useState, useMemo, } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

export default function ViewPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  // Load users
  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await api.getAll()
      setUsers(data)
    } catch (err) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  // Delete users
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return
    try {
      await api.remove(id)
      toast.success('User deleted')
      loadUsers()
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  // SEARCH FILTER
  const filteredUsers = useMemo(() => {
    if (!search) return users
    const lower = search.toLowerCase()
    return users.filter(
      (u) =>
        u.firstname.toLowerCase().includes(lower) ||
        u.lastname.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower)
    )
  }, [users, search])

  // SORT FUNCTION
  const sortedUsers = useMemo(() => {
    if (!sortKey) return filteredUsers
    const sorted = [...filteredUsers].sort((a, b) => {
      const aVal = a[sortKey].toString().toLowerCase()
      const bVal = b[sortKey].toString().toLowerCase()
      return aVal.localeCompare(bVal)
    })
    return sortOrder === 'desc' ? sorted.reverse() : sorted
  }, [filteredUsers, sortKey, sortOrder])

const displayedUsers = sortedUsers

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (key) => {
    if (sortKey !== key) return '↕️'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  return (
    <div className="container">
      <h2>Users List</h2>

      {/* SEARCH BAR */}
      <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '500px' }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 3rem 1rem 1.2rem',           
            fontSize: '1.15rem',
            borderRadius: '16px',                       
            border: '2px solid rgba(68, 68, 68, 1)',
            background: 'rgba(45, 45, 45, 1)',
            color: 'white',
            outline: 'none',
            transition: 'all 0.25s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            fontWeight: '500',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(0, 123, 255, 1)';
            e.target.style.boxShadow = '0 0 0 4px rgba(0,123,255,0.25)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(68, 68, 68, 1)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
          }}
        />

        {/* Clear Button - Bigger & Smoother */}
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(68, 68, 68, 1)',
              border: 'none',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              fontSize: '1.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(102, 102, 102, 1)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(68, 68, 68, 1)'}
          >
            ×
          </button>
        )}

        {/* Optional: Search Icon on Left */}
        <div style={{
          position: 'absolute',
          left: '1.2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(136, 136, 136, 1)',
          fontSize: '1.3rem',
          pointerEvents: 'none',
        }}>

        </div>
      </div>

      <Link to="/add">
        <button>Add New User</button>
      </Link>

     {loading ? (
  <p style={{ textAlign: 'center', padding: '3rem', color: 'rgba(136, 136, 136, 1)' }}>
    Loading users...
  </p>
) : sortedUsers.length === 0 ? (
  <p style={{ textAlign: 'center', color: 'rgba(136, 136, 136, 1)', fontSize: '1.4rem', padding: '4rem 0' }}>
    {search ? `No users found for "${search}"` : 'No users yet.'}<br />
    <Link to="/add" style={{ color: 'rgba(0, 123, 255, 1)', textDecoration: 'underline' }}>
      Add your first one!
    </Link>
  </p>
) : (
  <table style={{
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 12px'
  }}>
    <thead>
      <tr style={{ textAlign: 'left' }}>
        <th onClick={() => handleSort('firstname')} style={{ cursor: 'pointer', padding: '0.8rem 1rem' }}>
          First {getSortIcon('firstname')}
        </th>
        <th onClick={() => handleSort('lastname')} style={{ cursor: 'pointer', padding: '0.8rem 1rem' }}>
          Last {getSortIcon('lastname')}
        </th>
        <th onClick={() => handleSort('email')} style={{ cursor: 'pointer', padding: '0.8rem 1rem' }}>
          Email {getSortIcon('email')}
        </th>
        <th onClick={() => handleSort('gender')} style={{ cursor: 'pointer', padding: '0.8rem 1rem' }}>
          Gender {getSortIcon('gender')}
        </th>
        <th style={{ padding: '0.8rem 1rem' }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {displayedUsers.map((u) => (
        <tr
          key={u._id}
          style={{
            background: 'rgba(30, 30, 30, 1)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateY(0)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <td style={{ padding: '1.4rem 1rem', fontWeight: '500' }}>{u.firstname}</td>
          <td style={{ padding: '1.4rem 1rem' }}>{u.lastname}</td>
          <td style={{ padding: '1.4rem 1rem' }}>{u.email}</td>
          <td style={{ padding: '1.4rem 1rem' }}>{u.gender}</td>
          <td style={{ padding: '1.4rem 1rem' }}>
            <Link to={`/user/${u._id}`}>
              <button style={{
                background: 'rgba(40, 167, 69, 1)',
                color: 'white',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                marginRight: '0.5rem',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer'
              }}>
                View
              </button>
            </Link>
            <Link to={`/edit/${u._id}`} state={{ from: 'view' }}>
              <button style={{
                background: 'rgba(0, 123, 255, 1)',
                color: 'white',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                marginRight: '0.5rem',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer'
              }}>
                Edit
              </button>
            </Link>
            <button
              onClick={() => handleDelete(u._id)}
              style={{
                background: 'rgba(220, 53, 69, 1)',
                color: 'white',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}
    </div>
  )
}