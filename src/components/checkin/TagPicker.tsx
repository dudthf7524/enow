const TAGS: { key: string; label: string }[] = [
  { key: 'outlet',      label: '콘센트 있음' },
  { key: 'quiet',       label: '조용함' },
  { key: 'wifi_good',   label: 'WiFi 빠름' },
  { key: 'noisy',       label: '시끄러움' },
  { key: 'study_ok',    label: '작업 가능' },
  { key: 'window_seat', label: '창가 자리' },
]

interface Props {
  selected: string[]
  onChange: (tags: string[]) => void
}

export function TagPicker({ selected, onChange }: Props) {
  const toggle = (key: string) =>
    onChange(
      selected.includes(key)
        ? selected.filter(t => t !== key)
        : [...selected, key],
    )

  return (
    <div className="mb-6">
      <p className="section-label">
        분위기 <span className="normal-case font-normal text-black/30">선택사항</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {TAGS.map(({ key, label }) => {
          const active = selected.includes(key)
          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`
                px-3.5 py-1.5 rounded-full border text-sm
                transition-all duration-150 active:scale-95
                ${active
                  ? 'border-black bg-black text-white'
                  : 'border-black/15 text-black/60 hover:border-black/35'}
              `}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
