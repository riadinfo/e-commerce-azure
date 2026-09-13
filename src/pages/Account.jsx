import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function Account() {
  const { user, login, logout } = useStore()
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  if (user) {
    return (
      <div className="auth-card">
        <div className="eyebrow">Signed in</div>
        <h1>{user.name}</h1>
        <p className="muted">{user.email}</p>
        <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
          <Link className="btn btn-dark" to="/orders">Orders</Link>
          <Link className="btn btn-ghost" to="/wishlist">Wishlist</Link>
          <button className="btn btn-ghost" onClick={logout}>Sign out</button>
        </div>
      </div>
    )
  }

  const submit = (e) => {
    e.preventDefault()
    login({ name: form.name || form.email.split('@')[0], email: form.email })
  }

  return (
    <div className="auth-card">
      <h1>Account</h1>
      <p className="muted">Demo auth — stored only in this browser.</p>
      <div className="tabs">
        <button className={tab === 'login' ? 'on' : ''} onClick={() => setTab('login')}>Sign in</button>
        <button className={tab === 'register' ? 'on' : ''} onClick={() => setTab('register')}>Create</button>
      </div>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        {tab === 'register' && (
          <label className="field">Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        )}
        <label className="field">Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="field">Password<input type="password" required minLength={4} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="btn btn-primary" type="submit">{tab === 'login' ? 'Sign in' : 'Create account'}</button>
      </form>
    </div>
  )
}
