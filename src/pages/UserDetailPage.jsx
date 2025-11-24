// src/pages/UserDetailPage.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

export default function UserDetailPage() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const data = await api.getOne(id)
        setUser(data)
      } catch (err) {
        toast.error('User not found')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  if (loading) return <div className="container"><p>Loading user...</p></div>
  if (!user) return <div className="container"><p>User not found</p></div>

  // GENDER WITH ICON & FULL SUPPORT (male, female, other, prefer not to say)
  const getGenderDisplay = () => {
    switch (user.gender?.toLowerCase()) {
      case 'male':
        return { text: 'Male', icon: '♂', color: 'rgba(77, 171, 247, 1)' }
      case 'female':
        return { text: 'Female', icon: '♀', color: 'rgba(247, 131, 172, 1)' }
      case 'other':
        return { text: 'Non-binary / Other', icon: '⚧', color: 'rgba(151, 117, 250, 1)' }
      case 'prefer not to say':
        return { text: 'Prefer not to say', icon: '—', color: 'rgba(173, 181, 189, 1)' }
      default:
        return { text: user.gender || 'Not specified', icon: '?', color: 'rgba(134, 142, 150, 1)' }
    }
  }

  const gender = getGenderDisplay()

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div style={{
        background: 'rgba(30, 30, 30, 1)',
        padding: '2.5rem',
        borderRadius: '20px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        color: 'rgba(224, 224, 224, 1)',
        border: '1px solid rgba(51, 51, 51, 1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'rgba(0, 123, 255, 1)', fontSize: '2rem' }}>
          User Profile
        </h2>

        {/* AVATAR + NAME */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '140px',
            height: '140px',
            background: 'rgba(0, 123, 255, 1)',
            borderRadius: '50%',
            margin: '0 auto 1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.5rem',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 8px 20px rgba(0,123,255,0.4)'
          }}>
            {user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}
          </div>
          <h3 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>
            {user.firstname} {user.lastname}
          </h3>
          <p style={{ color: 'rgba(170, 170, 170, 1)', fontSize: '1.2rem' }}>{user.email}</p>
        </div>

        {/* DETAILS */}
        <div style={{ lineHeight: '2.2', fontSize: '1.15rem', padding: '0 1rem' }}>
          <p><strong>First Name:</strong> {user.firstname}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> <a href={`mailto:${user.email}`} style={{ color: 'rgba(77, 171, 247, 1)' }}>{user.email}</a></p>

          <p>
            <strong>Gender:</strong>{' '}
            <span style={{ color: gender.color, fontWeight: 'bold' }}>
              {gender.icon} {gender.text}
            </span>
          </p>

          <p>
            <strong>User ID:</strong>{' '}
            <code style={{
              background: 'rgba(45, 45, 45, 1)',
              padding: '0.3rem 0.7rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: 'rgba(81, 207, 102, 1)'
            }}>
              {user._id}
            </code>
          </p>

          {user.createdAt && (
            <p style={{ color: 'rgba(134, 142, 150, 1)', fontSize: '0.95rem' }}>
              <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to={`/edit/${user._id}`}
            state={{ from: 'profile' }}
          >
            <button style={{
              background: 'rgba(0, 123, 255, 1)',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '12px'
            }}>
              Edit User
            </button>
          </Link>
          <Link to="/view">
            <button style={{
              background: 'rgba(73, 80, 87, 1)',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '12px'
            }}>
              Back to List
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}