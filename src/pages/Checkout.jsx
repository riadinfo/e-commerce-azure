import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { moneyExact } from '../utils/format'
import { OrderSummary } from './Cart'

export default function Checkout() {
  const { cart, total, user, placeOrder } = useStore()
  const [form, setForm] = useState({
    name: user?.name || '',
    address: '',
    phone: '',
  })
  const [done, setDone] = useState(null)

  if (!cart.length && !done) {
    return (
      <div className="empty">
        <h2>Nothing to check out</h2>
        <Link className="btn btn-primary" to="/shop">Shop</Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="empty">
        <div className="eyebrow">Thank you</div>
        <h2>Order {done} is in.</h2>
        <p className="muted">This is a demo checkout — no charge was made. Track it under Orders.</p>
        <Link className="btn btn-primary" to="/orders">View orders</Link>
      </div>
    )
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const pay = (e) => {
    e.preventDefault()
    const id = `AZ-${Date.now().toString().slice(-8)}`
    placeOrder({
      id,
      date: new Date().toISOString(),
      total,
      items: cart,
      shipping: form,
      status: 'Processing',
    })
    setDone(id)
  }

  return (
    <div className="container checkout-layout">
      <form onSubmit={pay} style={{ display: 'grid', gap: 12 }}>
        <h1>Checkout</h1>
        <label className="field">Name<input required value={form.name} onChange={set('name')} /></label>
        <label className="field">Address<input required value={form.address} onChange={set('address')} /></label>
        <label className="field">Phone<input type="tel" required value={form.phone} onChange={set('phone')} /></label>
        <button className="btn btn-primary" type="submit">Pay {moneyExact(total)}</button>
      </form>
      <OrderSummary />
    </div>
  )
}
