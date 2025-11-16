// frontend/src/pages/EditPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    (async () => {
      const user = await api.getOne(id);
      setForm({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        gender: user.gender,
      });
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.update(id, form);
    toast.success('User updated!');
    navigate('/view');
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}