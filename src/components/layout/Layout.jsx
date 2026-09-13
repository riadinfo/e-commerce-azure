import { Heart, Home, Search, ShoppingBag, User } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <nav className="mobile-nav">
        <NavLink to="/" end><Home size={18} /> Home</NavLink>
        <NavLink to="/shop"><Search size={18} /> Shop</NavLink>
        <NavLink to="/wishlist"><Heart size={18} /> Saved</NavLink>
        <NavLink to="/cart"><ShoppingBag size={18} /> Bag</NavLink>
        <NavLink to="/account"><User size={18} /> Account</NavLink>
      </nav>
    </>
  )
}
