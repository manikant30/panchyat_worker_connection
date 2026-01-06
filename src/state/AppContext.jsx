import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AppContext = createContext(null)

const STORAGE_KEY = 'pwc_state_v1'

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function loadInitialState() {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  return safeParse(raw)
}

export function AppProvider({ children }) {
  const initial = loadInitialState()

  const [language, setLanguage] = useState(initial?.language || 'en')
  const [lowDataMode, setLowDataMode] = useState(Boolean(initial?.lowDataMode))
  const [savedWorkerIds, setSavedWorkerIds] = useState(initial?.savedWorkerIds || [])
  const [contactHistory, setContactHistory] = useState(initial?.contactHistory || [])
  const [complaints, setComplaints] = useState(initial?.complaints || [])

  useEffect(() => {
    const next = {
      language,
      lowDataMode,
      savedWorkerIds,
      contactHistory,
      complaints,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [language, lowDataMode, savedWorkerIds, contactHistory, complaints])

  const value = useMemo(() => {
    const isWorkerSaved = (workerId) => savedWorkerIds.includes(workerId)

    const toggleSavedWorker = (workerId) => {
      setSavedWorkerIds((prev) => {
        if (prev.includes(workerId)) return prev.filter((id) => id !== workerId)
        return [...prev, workerId]
      })
    }

    const addContactEntry = ({ workerId, type }) => {
      const entry = {
        id: `ch_${Date.now()}`,
        workerId,
        type,
        createdAt: new Date().toISOString(),
      }
      setContactHistory((prev) => [entry, ...prev])
      return entry
    }

    const submitComplaint = ({ workerId, category, description }) => {
      const complaint = {
        id: `cmp_${Date.now()}`,
        workerId: workerId || null,
        category,
        description,
        createdAt: new Date().toISOString(),
        status: 'Submitted',
        timeline: [
          {
            label: 'Submitted',
            at: new Date().toISOString(),
          },
        ],
      }
      setComplaints((prev) => [complaint, ...prev])
      return complaint
    }

    const updateComplaintStatus = (complaintId, status) => {
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id !== complaintId) return c
          const nextTimeline = [
            ...(c.timeline || []),
            {
              label: status,
              at: new Date().toISOString(),
            },
          ]
          return {
            ...c,
            status,
            timeline: nextTimeline,
          }
        })
      )
    }

    return {
      language,
      setLanguage,
      lowDataMode,
      setLowDataMode,
      savedWorkerIds,
      isWorkerSaved,
      toggleSavedWorker,
      contactHistory,
      addContactEntry,
      complaints,
      submitComplaint,
      updateComplaintStatus,
    }
  }, [language, lowDataMode, savedWorkerIds, contactHistory, complaints])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
