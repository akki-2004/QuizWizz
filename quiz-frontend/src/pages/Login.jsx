import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token);
      localStorage.setItem('username', form.username);
      navigate('/home');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4 bg-dark text-light rounded-4" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="text-center mb-4">🔐 Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input className="form-control bg-dark text-light border-secondary" required
              value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control bg-dark text-light border-secondary" required
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn btn-primary w-100 rounded-pill mt-2">Login</button>
        </form>
      </div>
    </div>
  );
}
