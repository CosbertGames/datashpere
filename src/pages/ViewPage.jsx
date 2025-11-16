// src/pages/ViewPage.jsx
import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

export default function ViewPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('')
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'

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
      <div style={{ marginBottom: '1rem', position: 'relative', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 2.5rem 0.75rem 0.75rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #444',
            background: '#2d2d2d',
            color: 'white',
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: '#aaa',
              fontSize: '1.4rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        )}
      </div>

      <Link to="/add">
        <button>Add New User</button>
      </Link>

      {loading ? (
        <p>Loading users...</p>
      ) : sortedUsers.length === 0 ? (
        <p>
          {search ? `No users found for "${search}"` : 'No users found.'}{' '}
          <Link to="/add">Add one!</Link>
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('firstname')} style={{ cursor: 'pointer' }}>
                First {getSortIcon('firstname')}
              </th>
              <th onClick={() => handleSort('lastname')} style={{ cursor: 'pointer' }}>
                Last {getSortIcon('lastname')}
              </th>
              <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                Email {getSortIcon('email')}
              </th>
              <th onClick={() => handleSort('gender')} style={{ cursor: 'pointer' }}>
                Gender {getSortIcon('gender')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((u) => (
              <tr key={u._id}>
                <td>{u.firstname}</td>
                <td>{u.lastname}</td>
                <td>{u.email}</td>
                <td>{u.gender}</td>
                <td>
                  <Link to={`/edit/${u._id}`}>
                    <button>Edit</button>
                  </Link>{' '}
                  <button
                    onClick={() => handleDelete(u._id)}
                    style={{ background: 'red', color: 'white' }}
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