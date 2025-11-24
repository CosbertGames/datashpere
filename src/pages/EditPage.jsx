// frontend/src/pages/EditPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect where we came from: 'profile' or 'view'
  const cameFrom = location.state?.from || 'view';

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const user = await api.getOne(id);
        setForm({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          gender: user.gender || '',
        });
      } catch (err) {
        toast.error('User not found');
        navigate('/view');
      }
    })();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.update(id, form); 
      toast.success('User updated successfully!');

      // SMART REDIRECT
      if (cameFrom === 'profile') {
        navigate(`/user/${id}`);
      } else {
        navigate('/view');
      }
    } catch (err) {
      toast.error('Failed to update user');
    }
  };

  // Smart Back Button
  const handleBack = () => {
    if (cameFrom === 'profile') {
      navigate(`/user/${id}`);
    } else {
      navigate('/view');
    }
  };

  return (
    <div className="container">
      <h2>Edit User</h2>

      {/* Smart Back Button */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          type="button"
          onClick={handleBack}
          style={{
            background: 'rgba(108, 117, 125, 1)',
            color: 'white',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Firstname"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
          required
        />
        <input
          placeholder="Lastname"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          style={{
            background: 'rgba(0, 123, 255, 1)',
            color: 'white',
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            fontSize: '1rem',
          }}
        >
          Update User
        </button>
      </form>
    </div>
  );
}