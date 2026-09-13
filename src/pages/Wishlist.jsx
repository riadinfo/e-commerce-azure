import { Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { useStore } from '../context/StoreContext'

export default function Wishlist() {
  const { products, wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  if (!items.length) {
    return (
      <div className="empty">
        <h2>No saved pieces yet</h2>
        <p className="muted">Tap the heart on anything you love.</p>
        <Link className="btn btn-primary" to="/shop">Browse the edit</Link>
      </div>
    )
  }

  return (
    <div className="container section">
      <div className="section-head">
        <h1>Wishlist</h1>
        <p className="muted">{items.length} saved</p>
      </div>
      <div className="grid-4">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
