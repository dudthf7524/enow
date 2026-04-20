import type { FreshnessStatus } from '@/types'

interface Props {
  status: FreshnessStatus
  minutesAgo?: number
}

const CONFIG: Record<FreshnessStatus, { label: (m?: number) => string; cls: string }> = {
  fresh:  {
    label: (m) => m !== undefined && m < 5 ? '방금' : `${m}분 전`,
    cls: 'bg-black text-white',
  },
  recent: {
    label: (m) => m !== undefined ? `${Math.floor(m / 60) || 1}시간 내` : '1시간 내',
    cls: 'bg-black/8 text-black/50',
  },
  stale:  {
    label: () => '오래된 정보',
    cls: 'bg-black/5 text-black/25',
  },
}

export function FreshnessBadge({ status, minutesAgo }: Props) {
  const { label, cls } = CONFIG[status]
  return (
    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${cls}`}>
      {label(minutesAgo)}
    </span>
  )
}
