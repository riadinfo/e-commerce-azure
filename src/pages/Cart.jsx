import { Minus, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { money, moneyExact } from '../utils/format'
import { useStore } from '../context/StoreContext'

export function OrderSummary({ cta, onCta, disabled }) {
  const { subtotal, discount, shipping, total, promo, promoInfo, applyPromo } = useStore()
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')

  return (
    <aside className="summary">
      <h3>Order summary</h3>
      <div className="row"><span>Subtotal</span><span>{moneyExact(subtotal)}</span></div>
      <div className="row"><span>Discount {promoInfo ? `(${promo})` : ''}</span><span>−{moneyExact(discount)}</span></div>
      <div className="row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : moneyExact(shipping)}</span></div>
      <div className="row" style={{ fontWeight: 700, fontSize: 18, marginTop: 12 }}>
        <span>Total</span><span>{moneyExact(total)}</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setErr(applyPromo(code) ? '' : 'Code not recognized')
        }}
        style={{ display: 'flex', gap: 8, margin: '16px 0' }}
      >
        <input className="field" style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid var(--line)' }} placeholder="Promo code" value={code} onChange={(e) => setCode(e.target.value)} />
        <button className="btn btn-ghost" type="submit">Apply</button>
      </form>
      {err && <p style={{ color: 'var(--sale)', fontSize: 13 }}>{err}</p>}
      <p className="muted" style={{ fontSize: 13 }}>Try AZURE20 or WELCOME10. Free shipping over BDT 2,500.</p>
      {cta && (
        <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} disabled={disabled} onClick={onCta}>
          {cta}
        </button>
      )}
    </aside>
  )
}

export default function Cart() {
  const { cart, setQty, removeFromCart } = useStore()
  const navigate = useNavigate()

  if (!cart.length) {
    return (
      <div className="empty">
        <h2>Your bag is empty</h2>
        <p className="muted">The Autumn edit is waiting.</p>
        <Link className="btn btn-primary" to="/shop">Start shopping</Link>
      </div>
    )
  }

  return (
    <div className="container cart-layout">
      <div>
        <h1>Bag</h1>
        {cart.map((item) => (
          <div className="line" key={`${item.id}-${item.size}-${item.color}`}>
            <Link to={`/product/${item.id}`}><img src={item.image} alt={item.name} /></Link>
            <div>
              <Link to={`/product/${item.id}`}><strong>{item.name}</strong></Link>
              <p className="muted">{item.color} · Size {item.size}</p>
              <p>{money(item.price)}</p>
              <div className="qty">
                <button onClick={() => setQty(item.id, item.size, item.color, item.qty - 1)}><Minus size={14} /></button>
                <span>{item.qty}</span>
                <button onClick={() => setQty(item.id, item.size, item.color, item.qty + 1)}><Plus size={14} /></button>
              </div>
            </div>
            <div>
              <strong>{money(item.price * item.qty)}</strong>
              <button className="icon-btn" onClick={() => removeFromCart(item.id, item.size, item.color)} aria-label="Remove">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <OrderSummary cta="Checkout" onCta={() => navigate('/checkout')} />
    </div>
  )
}
