import { useApp } from '../state/AppContext'

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label || opt.name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function FilterBar({
  filters,
  onChange,
  panchayatOptions,
  skillOptions,
  experienceOptions,
  ratingOptions,
}) {
  const { lowDataMode } = useApp()

  const setField = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    })
  }

  const hasActiveFilters =
    filters.panchayat !== 'any' ||
    filters.skill !== 'any' ||
    filters.experience !== 'any' ||
    filters.rating !== 'any'

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold text-gray-900">
            Search filters
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Filter by Panchayat, skill, experience and rating.
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              panchayat: 'any',
              skill: 'any',
              experience: 'any',
              rating: 'any',
            })
          }
          className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            hasActiveFilters ? '' : 'opacity-50'
          } ${lowDataMode ? '' : 'transition hover:bg-gray-50'}`}
          disabled={!hasActiveFilters}
        >
          Clear
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          label="Location (Panchayat)"
          value={filters.panchayat}
          onChange={(v) => setField('panchayat', v)}
          options={panchayatOptions}
        />
        <SelectField
          label="Skill"
          value={filters.skill}
          onChange={(v) => setField('skill', v)}
          options={skillOptions}
        />
        <SelectField
          label="Experience"
          value={filters.experience}
          onChange={(v) => setField('experience', v)}
          options={experienceOptions}
        />
        <SelectField
          label="Rating"
          value={filters.rating}
          onChange={(v) => setField('rating', v)}
          options={ratingOptions}
        />
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
        Tip: Panchayat verification improves accountability and reduces fake profiles.
      </div>
    </div>
  )
}
