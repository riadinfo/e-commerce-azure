import { ArrowRight, RefreshCcw, Shield, Truck, Undo2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { CATEGORY_LOOKS, HERO } from '../data/products'
import { useStore } from '../context/StoreContext'

function LookCard({ look }) {
  return (
    <Link
      to={look.href}
      className={`look-card${look.featured ? ' featured' : ''}${look.wide ? ' wide' : ''}`}
      style={{ background: look.tone || '#12233d' }}
    >
      <img
        src={look.image}
        alt={look.title}
        onError={(e) => {
          e.currentTarget.style.opacity = '0'
        }}
      />
      <div className="shade" />
      <div className="copy">
        <span className="eyebrow">{look.subtitle}</span>
        <strong>{look.title}</strong>
      </div>
    </Link>
  )
}

export default function Home() {
  const { products } = useStore()
  const featured = products.filter((p) => p.tags.includes('bestseller')).slice(0, 10)
  const newest = products.filter((p) => p.isNew).slice(0, 10)
  const sale = products.filter((p) => p.compareAt).slice(0, 10)

  return (
    <div>
      <section className="hero">
        <img
          src={HERO.image}
          alt=""
          onError={(e) => {
            e.currentTarget.style.opacity = '0'
          }}
        />
        <div className="container hero-copy">
          <div className="eyebrow">Autumn edit · 2026</div>
          <h1>{HERO.title}</h1>
          <p>{HERO.subtitle}</p>
          <Link className="btn btn-primary" to="/shop">
            {HERO.cta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Shop the house</div>
              <h2>Collections</h2>
            </div>
            <Link className="link" to="/shop">View all clothing</Link>
          </div>
          <div className="grid-looks">
            {CATEGORY_LOOKS.map((c) => (
              <LookCard key={c.id} look={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">House favorites</div>
              <h2>Bestsellers</h2>
            </div>
            <Link className="link" to="/shop">Shop all</Link>
          </div>
          <div className="grid-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Just arrived</div>
              <h2>New in</h2>
            </div>
            <Link className="link" to="/shop?sort=new">View new</Link>
          </div>
          <div className="grid-4">
            {newest.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Limited time</div>
              <h2>On sale</h2>
            </div>
            <Link className="link" to="/shop?sale=1">View sale</Link>
          </div>
          <div className="grid-4">
            {sale.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container values">
          <div className="value"><Truck size={22} color="#1a4b8c" /><h3>Free over BDT 2,500</h3><p className="muted">Carbon-aware shipping partners.</p></div>
          <div className="value"><Undo2 size={22} color="#1a4b8c" /><h3>30-day returns</h3><p className="muted">Send it back. No drama.</p></div>
          <div className="value"><Shield size={22} color="#1a4b8c" /><h3>Secure checkout</h3><p className="muted">Mock payments for this demo.</p></div>
          <div className="value"><RefreshCcw size={22} color="#1a4b8c" /><h3>Restock alerts</h3><p className="muted">Save pieces to your wishlist.</p></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="newsletter">
            <div>
              <div className="eyebrow">The azure note</div>
              <h2>10% off your first order</h2>
              <p className="muted" style={{ color: '#b7c7e0' }}>Use WELCOME10 at checkout. Stories, drops, and restocks — never spam.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email address" required />
              <button className="btn btn-primary" type="submit">Join</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
