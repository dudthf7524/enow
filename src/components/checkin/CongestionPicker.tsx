import type { CongestionLevel } from '@/types'

const OPTIONS: { value: CongestionLevel; label: string; sub: string }[] = [
  { value: 1, label: '여유',  sub: '자리 많음' },
  { value: 2, label: '보통',  sub: '자리 있음' },
  { value: 3, label: '혼잡',  sub: '자리 없음' },
]

interface Props {
  value: CongestionLevel | null
  onChange: (v: CongestionLevel) => void
}

export function CongestionPicker({ value, onChange }: Props) {
  return (
    <div className="mb-5">
      <p className="section-label">혼잡도</p>
      <div className="grid grid-cols-3 gap-2">
        {OPTIONS.map(({ value: v, label, sub }) => {
          const selected = value === v
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={`
                flex flex-col items-center justify-center gap-1.5
                h-[76px] rounded-2xl border-2
                transition-all duration-150 active:scale-95
                ${selected
                  ? 'border-black bg-black text-white'
                  : 'border-black/12 bg-white text-black hover:border-black/30'}
              `}
            >
              {/* 혼잡도 시각 인디케이터 */}
              <div className="flex gap-0.5 items-end h-3.5">
                <span className={`w-1 rounded-full ${selected ? 'bg-white' : 'bg-black'} ${v >= 1 ? 'h-full' : 'h-1/3'}`} />
                <span className={`w-1 rounded-full ${selected ? 'bg-white/70' : 'bg-black/50'} ${v >= 2 ? 'h-full' : 'h-1/2'}`} />
                <span className={`w-1 rounded-full ${selected ? 'bg-white/40' : 'bg-black/25'} ${v >= 3 ? 'h-full' : 'h-1/4'}`} />
              </div>
              <span className="text-sm font-bold leading-none">{label}</span>
              <span className={`text-[10px] leading-none ${selected ? 'text-white/60' : 'text-black/35'}`}>
                {sub}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
