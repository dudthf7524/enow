import { useState } from 'react'
import { BottomSheet } from '@/components/common/BottomSheet'
import { CongestionPicker } from './CongestionPicker'
import { TagPicker } from './TagPicker'
import type { CongestionLevel, CreateCheckinBody } from '@/types'

interface Props {
  open: boolean
  placeName: string
  kakaoPlaceId: string
  onSubmit: (data: CreateCheckinBody) => Promise<void>
  onClose: () => void
}

export function CheckInSheet({ open, placeName, kakaoPlaceId, onSubmit, onClose }: Props) {
  const [congestion, setCongestion] = useState<CongestionLevel | null>(null)
  const [tags, setTags]             = useState<string[]>([])
  const [loading, setLoading]       = useState(false)

  const reset = () => {
    setCongestion(null)
    setTags([])
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async () => {
    if (!congestion || loading) return
    setLoading(true)
    try {
      await onSubmit({ kakaoPlaceId, congestionLevel: congestion, tags })
      reset()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <BottomSheet open={open} onClose={handleClose}>
      {/* 장소명 헤더 */}
      <div className="mb-6 pt-2">
        <p className="text-[11px] font-medium tracking-widest text-black/35 uppercase mb-1">
          지금 여기
        </p>
        <h2 className="text-xl font-bold text-black truncate">{placeName}</h2>
      </div>

      {/* 터치 2 — 혼잡도 */}
      <CongestionPicker value={congestion} onChange={setCongestion} />

      {/* 선택사항 — 태그 */}
      <TagPicker selected={tags} onChange={setTags} />

      {/* 터치 3 — 제보하기 */}
      <button
        disabled={!congestion || loading}
        onClick={handleSubmit}
        className={`
          w-full h-14 rounded-2xl text-base font-bold
          transition-all duration-200 active:scale-[0.97]
          ${congestion && !loading
            ? 'bg-black text-white'
            : 'bg-black/8 text-black/25 cursor-not-allowed'}
        `}
      >
        {loading ? '제보 중...' : '지금 제보하기'}
      </button>
    </BottomSheet>
  )
}
