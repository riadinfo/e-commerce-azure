import { Link } from 'react-router-dom'
import { moneyExact } from '../utils/format'
import { useStore } from '../context/StoreContext'

export default function Orders() {
  const { orders, user } = useStore()

  if (!orders.length) {
    return (
      <div className="empty">
        <h2>No orders yet</h2>
        <p className="muted">{user ? 'Your purchases will land here.' : 'Sign in is optional — checkout still works.'}</p>
        <Link className="btn btn-primary" to="/shop">Shop the edit</Link>
      </div>
    )
  }

  return (
    <div className="container section">
      <h1>Orders</h1>
      {orders.map((o) => (
        <article key={o.id} className="order-card">
          <div className="row">
            <strong>{o.id}</strong>
            <span className="muted">{new Date(o.date).toLocaleDateString()}</span>
          </div>
          <p>{o.status} · {o.items.length} item(s) · {moneyExact(o.total)}</p>
          <div className="swatches">
            {o.items.map((i) => (
              <Link key={`${i.id}-${i.size}`} to={`/product/${i.id}`}>
                <img src={i.image} alt="" style={{ width: 56, height: 70, objectFit: 'cover', borderRadius: 8 }} />
              </Link>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
