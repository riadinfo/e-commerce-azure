import { Heart, Minus, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import RatingStars from '../components/product/RatingStars'
import { hexFor, relatedProducts } from '../data/products'
import { money } from '../utils/format'
import { useStore } from '../context/StoreContext'

export default function ProductDetail() {
  const { id } = useParams()
  const store = useStore()
  const product = store.getProduct(id)
  const [idx, setIdx] = useState(0)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [qty, setQty] = useState(1)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ user: '', rating: 5, title: '', comment: '' })

  const related = useMemo(() => (product ? relatedProducts(product) : []), [product])

  if (!product) {
    return (
      <div className="empty">
        <h2>Piece not found</h2>
        <Link className="btn btn-primary" to="/shop">Back to shop</Link>
      </div>
    )
  }

  const sale = product.compareAt && product.compareAt > product.price
  const chosenColor = color || product.colors[0]
  const chosenSize = size || product.sizes[1] || product.sizes[0]

  const add = () => {
    store.addToCart(product, chosenSize, chosenColor, qty)
    setToast('Added to bag')
    setTimeout(() => setToast(''), 1800)
  }

  const submitReview = (e) => {
    e.preventDefault()
    store.addReview(product.id, {
      id: `${form.user}-${Date.now()}`,
      user: form.user || 'Guest',
      rating: Number(form.rating),
      date: new Date().toISOString().slice(0, 10),
      title: form.title,
      comment: form.comment,
      verified: Boolean(store.user),
    })
    setForm({ user: '', rating: 5, title: '', comment: '' })
    setToast('Review published')
    setTimeout(() => setToast(''), 1800)
  }

  return (
    <div className="container">
      <div className="pdp">
        <div className="gallery">
          <div className="thumbs">
            {product.images.map((src, i) => (
              <button key={src} className={i === idx ? 'active' : ''} onClick={() => setIdx(i)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
          <div className="main-shot">
            <img src={product.images[idx]} alt={product.name} />
          </div>
        </div>
        <div className="pdp-info">
          <div className="eyebrow">{product.gender} · {product.category}</div>
          <h1>{product.name}</h1>
          <RatingStars value={product.rating} count={product.reviewCount} />
          <p className="price" style={{ fontSize: 22, margin: '14px 0' }}>
            {sale && <s>{money(product.compareAt)}</s>}
            <span className={sale ? 'now' : ''}>{money(product.price)}</span>
          </p>
          <p>{product.description}</p>

          <p style={{ fontWeight: 600, marginBottom: 8 }}>Color · {chosenColor}</p>
          <div className="swatches" style={{ marginBottom: 18 }}>
            {product.colors.map((c) => (
              <button
                key={c}
                className={`swatch lg ${chosenColor === c ? 'active' : ''}`}
                style={{ background: hexFor(c) }}
                title={c}
                onClick={() => setColor(c)}
              />
            ))}
          </div>

          <p style={{ fontWeight: 600, marginBottom: 8 }}>Size · {chosenSize}</p>
          <div className="size-row">
            {product.sizes.map((s) => (
              <button key={s} className={`size-chip ${chosenSize === s ? 'active' : ''}`} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>

          <div className="pdp-actions">
            <div className="qty">
              <button onClick={() => setQty((n) => Math.max(1, n - 1))}><Minus size={14} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty((n) => n + 1)}><Plus size={14} /></button>
            </div>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={add}>Add to bag</button>
            <button className={`btn btn-ghost ${store.isWished(product.id) ? 'on' : ''}`} onClick={() => store.toggleWish(product.id)}>
              <Heart size={18} fill={store.isWished(product.id) ? '#e11d48' : 'none'} />
            </button>
          </div>

          <div className="accordion">
            <details open>
              <summary>Fabric & care</summary>
              <p className="muted">{product.fabric}</p>
            </details>
            <details>
              <summary>Details</summary>
              <ul className="muted">{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </details>
            <details>
              <summary>Shipping</summary>
              <p className="muted">Free over BDT 2,500. Typical delivery 3–6 days. Easy 30-day returns.</p>
            </details>
          </div>
        </div>
      </div>

      <section className="reviews">
        <h2>Reviews</h2>
        <p className="muted">{product.reviewCount} ratings · average {product.rating.toFixed(1)}</p>
        {product.reviews.map((rev) => (
          <article key={rev.id} className="review">
            <strong>{rev.title}</strong>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <RatingStars value={rev.rating} />
              <span className="muted">{rev.user} · {rev.date} {rev.verified ? '· Verified' : ''}</span>
            </div>
            <p>{rev.comment}</p>
          </article>
        ))}
        <form className="review-form" onSubmit={submitReview}>
          <h3>Write a review</h3>
          <label className="field">Name
            <input value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })} required />
          </label>
          <label className="field">Rating
            <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
            </select>
          </label>
          <label className="field">Title
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>
          <label className="field">Comment
            <textarea rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required />
          </label>
          <button className="btn btn-dark" type="submit">Publish review</button>
        </form>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>You may also like</h2>
        </div>
        <div className="grid-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
