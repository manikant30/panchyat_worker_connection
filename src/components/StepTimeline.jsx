export default function StepTimeline({ steps }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-3">
      {steps.map((step, idx) => (
        <li
          key={step.title + idx}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-panchayatGreen-700 text-sm font-extrabold text-white"
              aria-hidden
            >
              {idx + 1}
            </div>
            <div>
              <div className="text-sm font-extrabold text-gray-900">
                {step.title}
              </div>
              {step.description ? (
                <div className="mt-1 text-sm text-gray-700">
                  {step.description}
                </div>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
