import { useQuery } from '@tanstack/react-query'
import { request } from '@/api/client'
import type { UserStats } from '@/types'

const ACTIVITY_TITLES = [
  { threshold: 100, title: '현장의 목격자' },
  { threshold: 50,  title: '카페 내비게이터' },
  { threshold: 20,  title: '공간 감별사' },
  { threshold: 5,   title: '단골 리포터' },
  { threshold: 0,   title: '새내기 탐험가' },
]

const INFLUENCE_TITLES = [
  { threshold: 250, title: '전설의 제보자' },
  { threshold: 100, title: '공간 수호자' },
  { threshold: 40,  title: '정보의 선물꾼' },
  { threshold: 10,  title: '친절한 이웃' },
]

function getNextTitle(checkins: number) {
  const next = ACTIVITY_TITLES.slice().reverse().find(t => t.threshold > checkins)
  return next ?? null
}

export default function ProfilePage() {
  const { data: stats, isLoading } = useQuery<UserStats>({
    queryKey: ['user', 'stats'],
    queryFn: () => request('/api/v1/users/me/stats'),
    retry: false,
  })

  if (isLoading) {
    return (
      <div className="p-5 pt-14 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-black/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  // 목업 데이터 (API 연결 전)
  const s: UserStats = stats ?? {
    totalCheckins: 0, helpfulReceived: 0, streakDays: 0,
    activityTitle: '새내기 탐험가',
  }

  const nextTitle = getNextTitle(s.totalCheckins)
  const progress  = nextTitle
    ? Math.min(100, Math.round((s.totalCheckins / nextTitle.threshold) * 100))
    : 100

  const earnedInfluence = INFLUENCE_TITLES.filter(t => s.helpfulReceived >= t.threshold)

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24">
      {/* 헤더 */}
      <header className="px-5 pt-14 pb-6 border-b border-black/5">
        <p className="text-[11px] font-medium tracking-widest text-black/35 uppercase mb-1">
          내 활동
        </p>
        <h1 className="text-2xl font-black text-black">{s.activityTitle}</h1>
        {s.influenceTitle && (
          <p className="text-sm text-black/40 mt-0.5">{s.influenceTitle}</p>
        )}
      </header>

      <div className="px-5 py-5 space-y-5">
        {/* 스탯 카드 */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: '제보 수',   value: s.totalCheckins },
            { label: '도움됐어요', value: s.helpfulReceived },
            { label: '연속 일수', value: `${s.streakDays}일` },
          ].map(({ label, value }) => (
            <div key={label} className="border border-black/8 rounded-2xl p-3 text-center">
              <p className="text-2xl font-black text-black">{value}</p>
              <p className="text-[10px] text-black/40 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* 다음 칭호까지 진행도 */}
        {nextTitle && (
          <div className="border border-black/8 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-black">다음 칭호</p>
              <p className="text-xs text-black/40">{nextTitle.title}</p>
            </div>
            <div className="h-1.5 bg-black/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-black/35 mt-1.5">
              {nextTitle.threshold - s.totalCheckins}번 더 제보하면 획득
            </p>
          </div>
        )}

        {/* 영향력 칭호 */}
        <div>
          <p className="section-label mb-3">영향력 칭호</p>
          <div className="space-y-2">
            {INFLUENCE_TITLES.map(({ threshold, title }) => {
              const earned = s.helpfulReceived >= threshold
              return (
                <div
                  key={title}
                  className={`flex items-center justify-between border rounded-2xl px-4 py-3
                    ${earned ? 'border-black' : 'border-black/8'}`}
                >
                  <span className={`text-sm font-semibold ${earned ? 'text-black' : 'text-black/25'}`}>
                    {title}
                  </span>
                  <span className={`text-xs ${earned ? 'text-black/40' : 'text-black/20'}`}>
                    도움됐어요 {threshold}+
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 스트릭 */}
        {s.streakDays >= 3 && (
          <div className="border border-black rounded-2xl px-4 py-3">
            <p className="text-sm font-bold text-black">
              {s.streakDays >= 30
                ? '이 동네 터줏대감 ✦'
                : s.streakDays >= 7
                ? '일주일 루티너'
                : '꾸준한 발걸음'}
            </p>
            <p className="text-xs text-black/40 mt-0.5">{s.streakDays}일 연속 제보 중</p>
          </div>
        )}
      </div>
    </div>
  )
}
