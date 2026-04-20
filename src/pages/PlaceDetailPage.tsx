import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePlaceDetail, useCreateCheckin, useVoteHelpful } from '@/hooks/usePlaces'
import { useToast } from '@/hooks/useToast'
import { CheckInSheet } from '@/components/checkin/CheckInSheet'
import { CheckinCard } from '@/components/feed/CheckinCard'
import { CongestionBar } from '@/components/common/CongestionBar'
import { FreshnessBadge } from '@/components/common/FreshnessBadge'
import { ToastContainer } from '@/components/common/Toast'
import { EmptyState } from '@/components/common/EmptyState'
import type { CreateCheckinBody } from '@/types'

export default function PlaceDetailPage() {
  const { kakaoPlaceId }           = useParams<{ kakaoPlaceId: string }>()
  const navigate                   = useNavigate()
  const { data, isLoading }        = usePlaceDetail(kakaoPlaceId ?? null)
  const { mutateAsync: checkin }   = useCreateCheckin()
  const { mutateAsync: helpful }   = useVoteHelpful()
  const { toasts, show, dismiss }  = useToast()
  const [sheetOpen, setSheetOpen]  = useState(false)

  const handleSubmit = async (body: CreateCheckinBody) => {
    const res = await checkin(body)
    if (res.reward.newActivityTitle) {
      show(`🎉 "${res.reward.newActivityTitle}" 칭호를 획득했어요!`, 'reward')
    } else {
      show('제보 완료!')
    }
  }

  const handleHelpful = async (id: number) => {
    await helpful(id)
    show('도움이 됐다고 전달했어요.')
  }

  if (isLoading) {
    return (
      <div className="p-5 pt-16 space-y-3">
        <div className="h-8 w-1/2 bg-black/5 rounded-xl animate-pulse" />
        <div className="h-4 w-1/3 bg-black/5 rounded-xl animate-pulse" />
        <div className="mt-6 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-black/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!data) return null

  const { place, checkins } = data
  const latest = place.latestCheckin

  return (
    <div className="flex flex-col h-full">
      <ToastContainer toasts={toasts} onDismiss={dismiss} />

      {/* 헤더 */}
      <header className="px-5 pt-14 pb-5 bg-white border-b border-black/5">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-black/40 mb-4 active:text-black"
        >
          ← 뒤로
        </button>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-black text-black truncate">{place.name}</h1>
            <p className="text-xs text-black/40 mt-0.5 truncate">{place.roadAddress}</p>
          </div>
          {latest && (
            <FreshnessBadge status={latest.freshnessStatus} minutesAgo={latest.minutesAgo} />
          )}
        </div>

        {/* 현재 상태 요약 */}
        {latest ? (
          <div className="mt-4">
            <CongestionBar level={latest.congestionLevel} />
          </div>
        ) : (
          <p className="mt-3 text-xs text-black/30">제보된 정보가 없어요</p>
        )}

        {/* 제보하기 버튼 — 터치 1 */}
        <button
          onClick={() => setSheetOpen(true)}
          className="mt-4 w-full h-12 rounded-2xl bg-black text-white text-sm font-bold
                     transition-all active:scale-[0.98]"
        >
          + 지금 상태 제보하기
        </button>
      </header>

      {/* 제보 목록 */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 pt-1 pb-2">
          <p className="text-[11px] font-semibold tracking-widest text-black/35 uppercase mt-4 mb-3">
            최근 제보
          </p>
          {checkins.length === 0 ? (
            <EmptyState
              icon="📋"
              title="아직 제보가 없어요"
              description="첫 번째로 현재 상태를 알려주세요"
            />
          ) : (
            <div className="flex flex-col gap-3">
              {checkins.map(c => (
                <CheckinCard key={c.id} checkin={c} onHelpful={handleHelpful} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 체크인 바텀시트 */}
      <CheckInSheet
        open={sheetOpen}
        placeName={place.name}
        kakaoPlaceId={place.kakaoPlaceId}
        onSubmit={handleSubmit}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  )
}
