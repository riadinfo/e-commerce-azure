import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { money } from '../../utils/format'
import { useStore } from '../../context/StoreContext'
import RatingStars from './RatingStars'

export default function ProductCard({ product, compact = false }) {
  const { toggleWish, isWished } = useStore()
  const sale = product.compareAt && product.compareAt > product.price
  const tag = sale ? 'Sale' : product.isNew ? 'New' : product.tags?.includes('bestseller') ? 'Bestseller' : null

  return (
    <article className={`product-card${compact ? ' compact' : ''}`}>
      <div className="product-media">
        <Link to={`/product/${product.id}`}>
          {tag && <span className={`tag ${sale ? 'sale' : ''}`}>{tag}</span>}
          <img
            className="img-a"
            src={product.images[0]}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.style.opacity = '0'
            }}
          />
          <img
            className="img-b"
            src={product.images[1] || product.images[0]}
            alt=""
            onError={(e) => {
              e.currentTarget.style.opacity = '0'
            }}
          />
        </Link>
        <button
          className={`wish-float ${isWished(product.id) ? 'on' : ''}`}
          aria-label="Wishlist"
          onClick={() => toggleWish(product.id)}
        >
          <Heart size={13} fill={isWished(product.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-meta">
        <div>
          <h3>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          {!compact && <RatingStars value={product.rating} count={product.reviewCount} />}
        </div>
        <div className="price">
          {sale && <s>{money(product.compareAt)}</s>}
          <span className={sale ? 'now' : ''}>{money(product.price)}</span>
        </div>
      </div>
    </article>
  )
}
