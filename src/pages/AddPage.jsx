// frontend/src/pages/AddPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

export default function AddPage() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.create(form);
      toast.success('User added!');
      navigate('/view');
    } catch (err) {
      toast.error('Failed to add user');
    }
  };

  return (
    <div className="container">
      <h2>Add User</h2>
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
          placeholder="Email@gmail.com"
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}