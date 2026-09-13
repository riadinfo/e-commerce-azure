import { CATEGORIES, COLOR_SWATCHES, SIZES } from '../../data/products'

const GENDERS = [
  { id: 'women', label: 'Female' },
  { id: 'men', label: 'Male' },
]

export default function FilterSidebar({ filters, setFilters, open }) {
  const toggle = (key, value) => {
    const list = filters[key]
    setFilters({
      ...filters,
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    })
  }

  return (
    <aside className={`filters ${open ? 'open' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 16 }}>Filters</h3>
        <button
          className="link"
          onClick={() => setFilters({
            gender: [],
            categories: [],
            sizes: [],
            colors: [],
            minPrice: 0,
            maxPrice: 5000,
            minRating: 0,
          })}
        >
          Clear
        </button>
      </div>

      <div className="filter-group">
        <h4>Gender</h4>
        {GENDERS.map((g) => (
          <label key={g.id}>
            <input type="checkbox" checked={filters.gender.includes(g.id)} onChange={() => toggle('gender', g.id)} />
            {g.label}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Category</h4>
        {CATEGORIES.map((c) => (
          <label key={c.id}>
            <input type="checkbox" checked={filters.categories.includes(c.id)} onChange={() => toggle('categories', c.id)} />
            {c.label}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Price · up to BDT {filters.maxPrice}</h4>
        <input
          className="range"
          type="range"
          min="500"
          max="5000"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
        />
      </div>

      <div className="filter-group">
        <h4>Size</h4>
        {SIZES.map((s) => (
          <label key={s}>
            <input type="checkbox" checked={filters.sizes.includes(s)} onChange={() => toggle('sizes', s)} />
            {s}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Color</h4>
        {COLOR_SWATCHES.map((c) => (
          <label key={c.name}>
            <input type="checkbox" checked={filters.colors.includes(c.name)} onChange={() => toggle('colors', c.name)} />
            <span className="swatch" style={{ background: c.hex }} /> {c.name}
          </label>
        ))}
      </div>

      <div className="filter-group" style={{ borderBottom: 0 }}>
        <h4>Rating</h4>
        {[4, 3, 0].map((n) => (
          <label key={n}>
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === n}
              onChange={() => setFilters({ ...filters, minRating: n })}
            />
            {n === 0 ? 'Any rating' : `${n}+ stars`}
          </label>
        ))}
      </div>
    </aside>
  )
}
