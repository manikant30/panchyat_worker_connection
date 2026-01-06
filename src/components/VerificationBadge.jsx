import Tooltip from './Tooltip'

export default function VerificationBadge({
  panchayatName,
  verifiedOn,
  showTooltip = true,
}) {
  const badge = (
    <span className="inline-flex items-center gap-2 rounded-full border border-panchayatGreen-100 bg-panchayatGreen-50 px-3 py-1 text-xs font-semibold text-panchayatGreen-700">
      <span
        aria-hidden
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-panchayatGreen-700 text-[11px] font-extrabold text-white"
      >
        ✔
      </span>
      <span>Panchayat Verified</span>
      {showTooltip ? (
        <span
          aria-hidden
          className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white text-[11px] font-bold text-gray-700"
        >
          i
        </span>
      ) : null}
    </span>
  )

  if (!showTooltip) return badge

  const content = `Verified by ${panchayatName || 'Panchayat'} on ${
    verifiedOn || '—'
  }`

  return <Tooltip content={content}>{badge}</Tooltip>
}
