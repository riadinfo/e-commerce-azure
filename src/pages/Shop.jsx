import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSidebar from '../components/product/FilterSidebar'
import ProductCard from '../components/product/ProductCard'
import { useStore } from '../context/StoreContext'

export default function Shop() {
  const { products } = useStore()
  const [params] = useSearchParams()
  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState(params.get('sort') || 'featured')
  const [filters, setFilters] = useState({
    gender: params.get('gender') ? [params.get('gender')] : [],
    categories: params.get('cat') ? [params.get('cat')] : [],
    sizes: [],
    colors: [],
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
  })

  useEffect(() => {
    const g = params.get('gender')
    const cat = params.get('cat')
    setSort(params.get('sort') || 'featured')
    setFilters((f) => ({
      ...f,
      gender: g ? [g] : [],
      categories: cat ? [cat] : f.categories,
    }))
  }, [params])

  const q = (params.get('q') || '').toLowerCase()
  const saleOnly = params.get('sale') === '1'

  const list = useMemo(() => {
    let items = [...products]
    if (q) items = items.filter((p) => `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q))
    if (saleOnly) items = items.filter((p) => p.compareAt)
    if (filters.gender.length) {
      items = items.filter((p) => p.gender === 'unisex' || filters.gender.includes(p.gender))
    }
    if (filters.categories.length) items = items.filter((p) => filters.categories.includes(p.category))
    if (filters.sizes.length) items = items.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)))
    if (filters.colors.length) items = items.filter((p) => p.colors.some((c) => filters.colors.includes(c)))
    items = items.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    if (filters.minRating) items = items.filter((p) => p.rating >= filters.minRating)

    if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
    if (sort === 'rating') items.sort((a, b) => b.rating - a.rating)
    if (sort === 'new') items.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    return items
  }, [products, q, saleOnly, filters, sort])

  return (
    <div className="container shop-page">
      <div className="toolbar">
        <div>
          <div className="eyebrow">The collection</div>
          <h1 style={{ fontSize: 30 }}>{q ? `Results for “${q}”` : saleOnly ? 'Sale' : 'All clothing'}</h1>
          <p className="muted">{list.length} pieces</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost filter-toggle" onClick={() => setOpen((v) => !v)}>
            <SlidersHorizontal size={16} /> Filters
          </button>
          <select className="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>
      <div className="shop-layout">
        <FilterSidebar filters={filters} setFilters={setFilters} open={open} />
        <div className="shop-results">
          {list.length === 0 ? (
            <div className="empty">
              <h2>No matches</h2>
              <p className="muted">Try clearing a filter or widening the price range.</p>
            </div>
          ) : (
            <div className="grid-4 shop-grid">{list.map((p) => <ProductCard key={p.id} product={p} compact />)}</div>
          )}
        </div>
      </div>
    </div>
  )
}
