import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">AZURE</div>
          <p>A modern clothing house. Considered cuts, honest fabrics, and a signature blue you can live in.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?gender=women">Women</Link></li>
            <li><Link to="/shop?gender=men">Men</Link></li>
            <li><Link to="/shop?sort=new">New arrivals</Link></li>
            <li><Link to="/shop?sale=1">Sale</Link></li>
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li><Link to="/orders">Orders & returns</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/cart">Shipping</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <h4>House</h4>
          <ul>
            <li>Size guide: XS–XL</li>
            <li>Materials we love</li>
            <li>Stores — coming soon</li>
            <li>hello@azure.shop</li>
          </ul>
        </div>
      </div>
      <div className="container legal">
        <span>© {new Date().getFullYear()} AZURE. Built for demonstration.</span>
        <span>BDT · Bangladesh</span>
      </div>
    </footer>
  )
}
