import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'

export default function Header() {
  const { cartCount, wishlist } = useStore()
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    navigate(`/shop?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <>
      <div className="promo-bar">Free shipping over BDT 2,500 · Easy 30-day returns · Code AZURE20</div>
      <header className="header">
        <div className="container header-inner">
          <button className="icon-btn filter-toggle" aria-label="Menu" onClick={() => navigate('/shop')}>
            <Menu size={20} />
          </button>
          <Link to="/" className="logo">AZURE</Link>
          <nav className="nav">
            <NavLink to="/shop?sort=new">New</NavLink>
            <NavLink to="/shop?gender=women">Women</NavLink>
            <NavLink to="/shop?gender=men">Men</NavLink>
            <NavLink to="/shop?sale=1">Sale</NavLink>
          </nav>
          <div className="header-actions">
            <form className="search-wrap" onSubmit={submit}>
              <Search size={16} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search shirts, denim…"
              />
            </form>
            <Link className="icon-btn" to="/account" aria-label="Account">
              <User size={20} />
            </Link>
            <Link className="icon-btn" to="/wishlist" aria-label="Wishlist">
              <Heart size={20} />
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>
            <Link className="icon-btn" to="/cart" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
