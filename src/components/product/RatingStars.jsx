export default function RatingStars({ value = 0, count, size = 14 }) {
  const full = Math.round(value)
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < full ? 'currentColor' : 'none'} stroke="currentColor">
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L12 16.8 6.8 19.7l1-5.8L3.5 9.7l5.9-.9L12 3.5z" strokeWidth="1.4" />
        </svg>
      ))}
      {count != null && <span className="count">{value.toFixed(1)} ({count})</span>}
    </span>
  )
}
