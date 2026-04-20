import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useNearbyPlaces, useCreateCheckin } from '@/hooks/usePlaces'
import { useToast } from '@/hooks/useToast'
import { PlaceCard } from '@/components/feed/PlaceCard'
import { CheckInSheet } from '@/components/checkin/CheckInSheet'
import { ToastContainer } from '@/components/common/Toast'
import { EmptyState } from '@/components/common/EmptyState'
import type { Place, CreateCheckinBody } from '@/types'

export default function HomePage() {
  const navigate                 = useNavigate()
  const { lat, lng, loading: geoLoading } = useGeolocation()
  const { data, isLoading }      = useNearbyPlaces(lat, lng)
  const { mutateAsync }          = useCreateCheckin()
  const { toasts, show, dismiss } = useToast()

  const [keyword, setKeyword]         = useState('')
  const [selected, setSelected]       = useState<Place | null>(null)
  const [sheetOpen, setSheetOpen]     = useState(false)

  const filtered = (data?.places ?? []).filter(p =>
    keyword === '' || p.name.includes(keyword) || p.roadAddress.includes(keyword),
  )

  const handleCheckinClick = (place: Place) => {
    setSelected(place)
    setSheetOpen(true)
  }

  const handleSubmit = async (body: CreateCheckinBody) => {
    const res = await mutateAsync(body)

    if (res.reward.newActivityTitle) {
      show(`🎉 "${res.reward.newActivityTitle}" 칭호를 획득했어요!`, 'reward')
    } else {
      show('제보 완료! 근처 카페를 찾는 분들에게 전달됩니다.')
    }
  }

  const loading = geoLoading || isLoading

  return (
    <div className="flex flex-col h-full">
      <ToastContainer toasts={toasts} onDismiss={dismiss} />

      {/* 헤더 */}
      <header className="px-5 pt-14 pb-4 bg-white border-b border-black/5">
        <h1 className="text-2xl font-black tracking-tight text-black mb-4">지금카페</h1>
        {/* 검색 */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30 text-sm">
            ⌕
          </span>
          <input
            type="text"
            placeholder="카페 이름이나 주소로 검색"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-black/5 text-sm text-black
                       placeholder:text-black/30 outline-none focus:bg-black/8 transition-colors"
          />
        </div>
      </header>

      {/* 피드 */}
      <main className="flex-1 overflow-y-auto pb-24">
        {loading ? (
          <div className="flex flex-col gap-3 p-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-black/5 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="☕"
            title="주변 카페를 찾지 못했어요"
            description="반경을 넓히거나 다른 키워드로 검색해보세요"
          />
        ) : (
          <div className="flex flex-col gap-3 p-4">
            {filtered.map(place => (
              <PlaceCard
                key={place.kakaoPlaceId}
                place={place}
                onCheckinClick={handleCheckinClick}
                onClick={p => navigate(`/place/${p.kakaoPlaceId}`)}
              />
            ))}
          </div>
        )}
      </main>

      {/* 체크인 바텀시트 */}
      {selected && (
        <CheckInSheet
          open={sheetOpen}
          placeName={selected.name}
          kakaoPlaceId={selected.kakaoPlaceId}
          onSubmit={handleSubmit}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </div>
  )
}
