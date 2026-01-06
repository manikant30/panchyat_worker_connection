import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ConfirmationModal from '../components/ConfirmationModal'
import Tooltip from '../components/Tooltip'
import VerificationBadge from '../components/VerificationBadge'
import { panchayatOptions, workers } from '../data/workers'
import { useApp } from '../state/AppContext'

function formatDateDDMMYYYY(date = new Date()) {
  try {
    return new Date(date).toLocaleDateString('en-GB')
  } catch {
    return ''
  }
}

function StatusPill({ status }) {
  const styles = {
    Approved: 'border-panchayatGreen-100 bg-panchayatGreen-50 text-panchayatGreen-700',
    Pending: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    Rejected: 'border-red-200 bg-red-50 text-red-700',
    Suspended: 'border-gray-300 bg-gray-100 text-gray-800',
  }

  const key = String(status || '').split(':')[0].trim()

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[key] || 'border-gray-200 bg-gray-50 text-gray-700'
      }`}
    >
      {status}
    </span>
  )
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600"
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  )
}

function formatDateTime(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function PanchayatDashboard() {
  const { lowDataMode, complaints, updateComplaintStatus, contactHistory } = useApp()

  const panchayatList = useMemo(
    () => panchayatOptions.filter((p) => p.id !== 'any'),
    []
  )

  const panchayatNameById = useMemo(() => {
    const map = new Map()
    panchayatList.forEach((p) => map.set(p.id, p.name))
    return map
  }, [panchayatList])

  const workerById = useMemo(() => {
    const map = new Map()
    workers.forEach((w) => map.set(w.id, w))
    return map
  }, [])

  const [records, setRecords] = useState(() => {
    const seedStatusByIndex = ['Approved', 'Pending', 'Approved', 'Rejected', 'Suspended']

    return workers.map((w, idx) => {
      const status = seedStatusByIndex[idx] || 'Pending'
      return {
        workerId: w.id,
        status,
        panchayatId: w.panchayatId,
        verifiedOn: status === 'Approved' ? w.verifiedOn : '',
        suspensionReason: status === 'Suspended' ? 'Multiple complaints (demo)' : '',
      }
    })
  })

  const [localComplaints, setLocalComplaints] = useState(() => [
    {
      id: 'cmp_demo_1',
      workerId: 'w_101',
      category: 'Work quality complaint',
      description: 'Plaster finishing was uneven in one room. Needs rework discussion.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      status: 'Submitted',
      timeline: [
        {
          label: 'Submitted',
          at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        },
      ],
      source: 'demo',
    },
    {
      id: 'cmp_demo_2',
      workerId: 'w_104',
      category: 'Behavior / safety concern',
      description: 'Customer requested a call-back and safety clarification.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      status: 'In Review',
      timeline: [
        {
          label: 'Submitted',
          at: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
        },
        {
          label: 'In Review',
          at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
        },
      ],
      source: 'demo',
    },
  ])

  const allComplaints = useMemo(() => {
    const withSource = complaints.map((c) => ({ ...c, source: 'user' }))
    return [...withSource, ...localComplaints].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [complaints, localComplaints])

  const [confirm, setConfirm] = useState(null)

  const stats = useMemo(() => {
    const counts = {
      Approved: 0,
      Pending: 0,
      Rejected: 0,
      Suspended: 0,
    }

    records.forEach((r) => {
      counts[r.status] = (counts[r.status] || 0) + 1
    })

    const complaintPendingCount = allComplaints.filter(
      (c) => c.status !== 'Resolved'
    ).length

    return {
      workersTotal: records.length,
      approved: counts.Approved,
      pending: counts.Pending,
      rejected: counts.Rejected,
      suspended: counts.Suspended,
      complaintPendingCount,
    }
  }, [records, allComplaints])

  const revenueCards = useMemo(() => {
    const leadsSold = contactHistory.filter((c) => c.type === 'paid_lead').length

    return [
      {
        title: 'Listing fees collected (demo)',
        value: '₹1,24,500',
        note: 'Monthly totals shown as static UI.',
      },
      {
        title: 'Paid leads (contacts unlocked)',
        value: String(leadsSold),
        note: 'Based on contact actions recorded in this demo.',
      },
      {
        title: 'Complaints pending',
        value: String(stats.complaintPendingCount),
        note: 'Submitted / In Review / Escalated.',
      },
      {
        title: 'Workers suspended',
        value: String(stats.suspended),
        note: 'Suspension status is UI-only.',
      },
    ]
  }, [contactHistory, stats.complaintPendingCount, stats.suspended])

  const setStatus = (workerId, status) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.workerId !== workerId) return r
        const nextVerifiedOn = status === 'Approved' ? formatDateDDMMYYYY() : ''
        return {
          ...r,
          status,
          verifiedOn: status === 'Approved' ? nextVerifiedOn : r.verifiedOn,
          suspensionReason: status === 'Suspended' ? r.suspensionReason || '—' : '',
        }
      })
    )
  }

  const setPanchayat = (workerId, panchayatId) => {
    setRecords((prev) =>
      prev.map((r) => (r.workerId === workerId ? { ...r, panchayatId } : r))
    )
  }

  const updateLocalComplaintStatus = (complaintId, status) => {
    setLocalComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c
        const nextTimeline = [
          ...(c.timeline || []),
          { label: status, at: new Date().toISOString() },
        ]
        return { ...c, status, timeline: nextTimeline }
      })
    )
  }

  const updateAnyComplaintStatus = (complaint, status) => {
    if (complaint.source === 'user') {
      updateComplaintStatus(complaint.id, status)
      return
    }
    updateLocalComplaintStatus(complaint.id, status)
  }

  const actionButtonsClass =
    'inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2'

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-2xl font-extrabold text-gray-900">
            Panchayat / Admin Dashboard
          </div>
          <div className="mt-1 text-sm text-gray-700">
            Verification actions, complaints monitoring and revenue overview (UI only).
          </div>
        </div>

        <Link
          to="/workers"
          className={`inline-flex items-center justify-center rounded-lg bg-panchayatGreen-700 px-5 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
            lowDataMode ? '' : 'transition hover:bg-panchayatGreen-600'
          }`}
        >
          View public worker listing
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {revenueCards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="text-xs font-bold text-gray-700">{card.title}</div>
            <div className="mt-2 text-2xl font-extrabold text-gray-900">
              {card.value}
            </div>
            <div className="mt-2 text-xs text-gray-600">{card.note}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-base font-extrabold text-gray-900">
                Worker verification table
              </div>
              <div className="mt-1 text-sm text-gray-700">
                Approve/reject workers, assign Panchayat badge, or suspend if required.
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill status={`Approved: ${stats.approved}`} />
              <StatusPill status={`Pending: ${stats.pending}`} />
              <StatusPill status={`Rejected: ${stats.rejected}`} />
              <StatusPill status={`Suspended: ${stats.suspended}`} />
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[780px] border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-700">
                  <th className="border-b border-gray-200 pb-3">Worker</th>
                  <th className="border-b border-gray-200 pb-3">Skill</th>
                  <th className="border-b border-gray-200 pb-3">Panchayat</th>
                  <th className="border-b border-gray-200 pb-3">Status</th>
                  <th className="border-b border-gray-200 pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => {
                  const w = workerById.get(r.workerId)
                  const panchayatName = panchayatNameById.get(r.panchayatId) || '—'

                  return (
                    <tr key={r.workerId} className="text-sm">
                      <td className="border-b border-gray-100 py-4 pr-4">
                        <div className="font-extrabold text-gray-900">{w?.name}</div>
                        <div className="mt-1 text-xs text-gray-600">
                          {w?.village} • {w?.experienceYears} yrs
                        </div>
                      </td>
                      <td className="border-b border-gray-100 py-4 pr-4">
                        <div className="font-semibold text-gray-900">{w?.skill}</div>
                        <div className="mt-1 text-xs text-gray-600">
                          {w?.primarySkill}
                        </div>
                      </td>
                      <td className="border-b border-gray-100 py-4 pr-4">
                        <Select
                          value={r.panchayatId}
                          onChange={(v) => setPanchayat(r.workerId, v)}
                          options={panchayatList}
                        />
                        <div className="mt-2">
                          {r.status === 'Approved' ? (
                            <VerificationBadge
                              panchayatName={panchayatName}
                              verifiedOn={r.verifiedOn}
                            />
                          ) : (
                            <div className="text-xs text-gray-600">
                              Badge inactive until approved.
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border-b border-gray-100 py-4 pr-4">
                        <StatusPill status={r.status} />
                        {r.status === 'Suspended' ? (
                          <div className="mt-2 text-xs text-gray-700">
                            Reason: {r.suspensionReason || '—'}
                          </div>
                        ) : null}
                      </td>
                      <td className="border-b border-gray-100 py-4">
                        <div className="grid gap-2 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() =>
                              setConfirm({
                                kind: 'approve',
                                workerId: r.workerId,
                              })
                            }
                            className={`${actionButtonsClass} border-panchayatGreen-100 bg-panchayatGreen-50 text-panchayatGreen-700 ${
                              lowDataMode ? '' : 'transition hover:bg-panchayatGreen-100'
                            }`}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setConfirm({
                                kind: 'reject',
                                workerId: r.workerId,
                              })
                            }
                            className={`${actionButtonsClass} border-red-200 bg-red-50 text-red-700 ${
                              lowDataMode ? '' : 'transition hover:bg-red-100'
                            }`}
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setConfirm({
                                kind: 'suspend',
                                workerId: r.workerId,
                              })
                            }
                            className={`${actionButtonsClass} border-gray-300 bg-gray-100 text-gray-800 ${
                              lowDataMode ? '' : 'transition hover:bg-gray-200'
                            }`}
                          >
                            {r.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                          </button>
                          <Link
                            to={`/workers/${r.workerId}`}
                            className={`${actionButtonsClass} border-gray-200 bg-white text-gray-900 ${
                              lowDataMode ? '' : 'transition hover:bg-gray-50'
                            }`}
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-base font-extrabold text-gray-900">
            Complaint monitoring
          </div>
          <div className="mt-1 text-sm text-gray-700">
            Track issues, update status, and monitor patterns.
          </div>

          <div className="mt-4 space-y-3">
            {allComplaints.length ? (
              allComplaints.slice(0, 6).map((c) => {
                const w = c.workerId ? workerById.get(c.workerId) : null

                return (
                  <div
                    key={c.id}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-extrabold text-gray-900">
                          {c.category}
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          {w ? `${w.name} • ${w.skill}` : 'General complaint'}
                        </div>
                      </div>
                      <Tooltip
                        content={`Complaint ID: ${c.id} • Source: ${
                          c.source === 'user' ? 'User' : 'Demo'
                        }`}
                      >
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                          {c.status}
                        </span>
                      </Tooltip>
                    </div>

                    <div className="mt-3 text-sm text-gray-700">{c.description}</div>
                    <div className="mt-2 text-xs text-gray-600">
                      Submitted: {formatDateTime(c.createdAt)}
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => updateAnyComplaintStatus(c, 'In Review')}
                        className={`inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-panchayatGreen-600 focus:ring-offset-2 ${
                          lowDataMode ? '' : 'transition hover:bg-gray-50'
                        }`}
                      >
                        Mark In Review
                      </button>
                      <button
                        type="button"
                        onClick={() => updateAnyComplaintStatus(c, 'Resolved')}
                        className={`inline-flex items-center justify-center rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                          lowDataMode ? '' : 'transition hover:bg-gray-800'
                        }`}
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                No complaints found.
              </div>
            )}
          </div>

          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
            Disputes are recorded for accountability. Verification confirms identity,
            not work guarantee.
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-base font-extrabold text-gray-900">
          Revenue tracking (demo)
        </div>
        <div className="mt-2 text-sm text-gray-700">
          Listing fee and lead revenue are shown as dashboard cards. Payments are not
          processed.
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm font-bold text-gray-900">Lead pricing range</div>
            <div className="mt-1 text-sm text-gray-700">₹10–₹30 per contact</div>
            <div className="mt-2 text-xs text-gray-600">
              Based on worker type and Panchayat rules (UI only).
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm font-bold text-gray-900">Listing fee range</div>
            <div className="mt-1 text-sm text-gray-700">₹199–₹699 per month</div>
            <div className="mt-2 text-xs text-gray-600">No hidden charges statement.</div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={Boolean(confirm)}
        title={
          confirm?.kind === 'approve'
            ? 'Approve worker'
            : confirm?.kind === 'reject'
            ? 'Reject worker'
            : 'Update suspension status'
        }
        description={
          confirm?.kind === 'approve'
            ? 'This will mark the worker as Approved and activate the verification badge (UI only).'
            : confirm?.kind === 'reject'
            ? 'This will mark the worker as Rejected. The badge will remain inactive (UI only).'
            : 'This will toggle the worker suspension status (UI only).'
        }
        confirmText={
          confirm?.kind === 'approve'
            ? 'Approve'
            : confirm?.kind === 'reject'
            ? 'Reject'
            : 'Confirm'
        }
        cancelText="Cancel"
        tone={confirm?.kind === 'reject' ? 'danger' : 'neutral'}
        onConfirm={() => {
          if (!confirm) return
          const workerId = confirm.workerId
          const current = records.find((r) => r.workerId === workerId)

          if (confirm.kind === 'approve') {
            setStatus(workerId, 'Approved')
          } else if (confirm.kind === 'reject') {
            setStatus(workerId, 'Rejected')
          } else {
            if (current?.status === 'Suspended') setStatus(workerId, 'Approved')
            else setStatus(workerId, 'Suspended')
          }

          setConfirm(null)
        }}
        onClose={() => setConfirm(null)}
      />
    </div>
  )
}
