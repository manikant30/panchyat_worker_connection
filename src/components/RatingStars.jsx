export default function RatingStars({ rating = 0, reviewsCount }) {
  const rounded = Math.round(rating * 10) / 10
  const filled = Math.round(rating)

  return (
    <div className="inline-flex items-center gap-1">
      <div className="inline-flex" aria-label={`Rating ${rounded} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            aria-hidden
            className={i <= filled ? 'text-yellow-500' : 'text-gray-300'}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs font-semibold text-gray-700">{rounded}</span>
      {typeof reviewsCount === 'number' ? (
        <span className="text-xs text-gray-500">({reviewsCount})</span>
      ) : null}
    </div>
  )
}
