import type { Checkin } from '@/types'
import { FreshnessBadge } from '@/components/common/FreshnessBadge'

const TAG_LABELS: Record<string, string> = {
  outlet: '콘센트', quiet: '조용함', wifi_good: 'WiFi',
  noisy: '시끄러움', study_ok: '작업가능', window_seat: '창가',
}

const CONGESTION_TEXT: Record<number, string> = {
  1: '여유 — 자리 많음',
  2: '보통 — 자리 있음',
  3: '혼잡 — 자리 없음',
}

const FRESHNESS_DIM: Record<string, string> = {
  fresh:  'opacity-100',
  recent: 'opacity-55',
  stale:  'opacity-20 grayscale',
}

interface Props {
  checkin: Checkin
  onHelpful: (id: number) => void
}

export function CheckinCard({ checkin, onHelpful }: Props) {
  const dimCls = FRESHNESS_DIM[checkin.freshnessStatus]

  return (
    <div className={`border border-black/8 rounded-2xl p-4 transition-all ${dimCls}`}>
      {/* 헤더: 사용자 + 뱃지 */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-black/8 flex items-center justify-center text-xs font-bold text-black/40">
            {checkin.user.nickname[0]}
          </div>
          <div>
            <span className="text-sm font-semibold text-black">{checkin.user.nickname}</span>
            <span className="text-[10px] text-black/30 ml-1.5">{checkin.user.activityTitle}</span>
          </div>
        </div>
        <FreshnessBadge status={checkin.freshnessStatus} minutesAgo={checkin.minutesAgo} />
      </div>

      {/* 혼잡도 */}
      <p className="text-sm font-semibold text-black mb-1.5">
        {CONGESTION_TEXT[checkin.congestionLevel]}
      </p>

      {/* 태그 */}
      {checkin.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {checkin.tags.map(key => (
            <span key={key} className="text-[10px] px-2 py-0.5 bg-black/5 rounded-full text-black/50">
              {TAG_LABELS[key] ?? key}
            </span>
          ))}
        </div>
      )}

      {/* 메모 */}
      {checkin.memo && (
        <p className="text-sm text-black/60 mb-2.5">{checkin.memo}</p>
      )}

      {/* 도움됐어요 */}
      <button
        onClick={() => onHelpful(checkin.id)}
        disabled={checkin.votedHelpful}
        className={`
          flex items-center gap-1.5 text-xs font-medium
          transition-all active:scale-95
          ${checkin.votedHelpful
            ? 'text-black cursor-default'
            : 'text-black/35 hover:text-black'}
        `}
      >
        <span>{checkin.votedHelpful ? '✓' : '+'}</span>
        <span>도움됐어요 {checkin.helpfulCount > 0 && checkin.helpfulCount}</span>
      </button>
    </div>
  )
}
