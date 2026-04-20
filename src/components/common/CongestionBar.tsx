import type { CongestionLevel } from '@/types'

interface Props {
  level: CongestionLevel
  showLabel?: boolean
}

const CONFIG: Record<CongestionLevel, { label: string; sub: string; barWidth: string; barColor: string }> = {
  1: { label: '여유', sub: '자리 많음',  barWidth: 'w-1/3', barColor: 'bg-black' },
  2: { label: '보통', sub: '자리 있음',  barWidth: 'w-2/3', barColor: 'bg-black' },
  3: { label: '혼잡', sub: '자리 없음',  barWidth: 'w-full', barColor: 'bg-black' },
}

export function CongestionBar({ level, showLabel = true }: Props) {
  const { label, sub, barWidth, barColor } = CONFIG[level]
  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-black">{label}</span>
          <span className="text-xs text-black/35">{sub}</span>
        </div>
      )}
      <div className="h-1 bg-black/8 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${barWidth} ${barColor}`} />
      </div>
    </div>
  )
}
