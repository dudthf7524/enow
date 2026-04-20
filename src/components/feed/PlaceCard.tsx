import type { Place } from '@/types'
import { FreshnessBadge } from '@/components/common/FreshnessBadge'
import { CongestionBar } from '@/components/common/CongestionBar'

const TAG_LABELS: Record<string, string> = {
  outlet: '콘센트', quiet: '조용함', wifi_good: 'WiFi',
  noisy: '시끄러움', study_ok: '작업가능', window_seat: '창가',
}

const FRESHNESS_DIM: Record<string, string> = {
  fresh:  'opacity-100',
  recent: 'opacity-55',
  stale:  'opacity-25 grayscale',
}

interface Props {
  place: Place
  onCheckinClick: (place: Place) => void
  onClick: (place: Place) => void
}

export function PlaceCard({ place, onCheckinClick, onClick }: Props) {
  const latest  = place.latestCheckin
  const status  = latest?.freshnessStatus ?? 'stale'
  const dimCls  = FRESHNESS_DIM[status]

  return (
    <div
      className="border border-black/8 rounded-2xl p-4 bg-white active:bg-black/3 cursor-pointer"
      onClick={() => onClick(place)}
    >
      {/* 장소 헤더 */}
      <div className="flex items-start gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-base font-bold text-black truncate">{place.name}</p>
            {place.distanceMeters !== undefined && (
              <span className="text-[10px] text-black/30 shrink-0">
                {place.distanceMeters < 1000
                  ? `${place.distanceMeters}m`
                  : `${(place.distanceMeters / 1000).toFixed(1)}km`}
              </span>
            )}
          </div>
          <p className="text-xs text-black/40 truncate">{place.roadAddress}</p>
        </div>
        {latest && (
          <FreshnessBadge
            status={latest.freshnessStatus}
            minutesAgo={latest.minutesAgo}
          />
        )}
      </div>

      {/* 제보 정보 */}
      <div className={`transition-all mb-3 ${dimCls}`}>
        {latest ? (
          <>
            <CongestionBar level={latest.congestionLevel} />
            {latest.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {latest.tags.slice(0, 4).map(key => (
                  <span
                    key={key}
                    className="text-[10px] px-2 py-0.5 bg-black/5 rounded-full text-black/50"
                  >
                    {TAG_LABELS[key] ?? key}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-xs text-black/25">아직 제보가 없어요</p>
        )}
      </div>

      {/* 제보하기 버튼 — 터치 1 */}
      <button
        onClick={e => { e.stopPropagation(); onCheckinClick(place) }}
        className="w-full h-10 rounded-xl border border-black/12 text-sm font-semibold text-black/60
                   hover:bg-black hover:text-white hover:border-black
                   transition-all duration-200 active:scale-[0.98]"
      >
        + 지금 상태 제보
      </button>
    </div>
  )
}
