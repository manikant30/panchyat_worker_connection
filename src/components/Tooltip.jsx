import { useId, useState } from 'react'
import { useApp } from '../state/AppContext'

export default function Tooltip({ content, children, maxWidthClassName = 'max-w-xs' }) {
  const { lowDataMode } = useApp()
  const id = useId()
  const [open, setOpen] = useState(false)

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        tabIndex={0}
        aria-describedby={open ? id : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center focus:outline-none"
      >
        {children}
      </span>
      {open ? (
        <span
          role="tooltip"
          id={id}
          className={`absolute left-1/2 top-full z-50 mt-2 w-max -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 shadow ${
            lowDataMode ? '' : 'transition'
          } ${maxWidthClassName}`}
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
