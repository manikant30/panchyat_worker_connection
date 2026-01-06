import { useEffect, useMemo, useRef } from 'react'
import { useApp } from '../state/AppContext'

export default function ConfirmationModal({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  tone = 'primary',
  onConfirm,
  onClose,
}) {
  const { lowDataMode } = useApp()
  const confirmRef = useRef(null)

  const confirmClassName = useMemo(() => {
    if (tone === 'danger') return 'bg-red-600 hover:bg-red-700 focus:ring-red-600'
    if (tone === 'neutral')
      return 'bg-gray-900 hover:bg-gray-800 focus:ring-gray-900'
    return 'bg-panchayatGreen-700 hover:bg-panchayatGreen-600 focus:ring-panchayatGreen-600'
  }, [tone])

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => confirmRef.current?.focus(), 10)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`absolute inset-0 bg-black/40 ${
          lowDataMode ? '' : 'transition'
        }`}
        onClick={() => onClose?.()}
      />
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
          <div className="text-base font-extrabold text-gray-900">{title}</div>
          {description ? (
            <div className="mt-2 text-sm text-gray-700">{description}</div>
          ) : null}

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2"
            >
              {cancelText}
            </button>
            <button
              ref={confirmRef}
              type="button"
              onClick={() => onConfirm?.()}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                lowDataMode ? '' : 'transition'
              } ${confirmClassName}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
