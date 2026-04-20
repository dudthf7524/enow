import { MOCK_PLACES, MOCK_CHECKINS } from './data'
import type { NearbyPlacesResponse, PlaceDetailResponse, CreateCheckinResponse } from '@/types'

// 개발 환경에서 fetch를 가로채 목업 응답 반환
const ROUTES: [string, (url: URL, init?: RequestInit) => unknown][] = [
  ['/api/v1/places/nearby', () => ({
    places: MOCK_PLACES,
    meta: { total: MOCK_PLACES.length, radius: 500 },
  } satisfies NearbyPlacesResponse)],

  ['/api/v1/places/', (url) => {
    const placeId = url.pathname.split('/').pop()
    const place   = MOCK_PLACES.find(p => p.kakaoPlaceId === placeId) ?? MOCK_PLACES[0]
    return {
      place,
      checkins:     MOCK_CHECKINS,
      checkinCount: MOCK_CHECKINS.length,
    } satisfies PlaceDetailResponse
  }],

  ['/api/v1/checkins', (_url, init) => {
    const body = JSON.parse((init?.body as string) ?? '{}')
    const newCheckin = {
      id: Date.now(),
      user: { id: 99, nickname: '나', activityTitle: '새내기 탐험가' },
      congestionLevel: body.congestionLevel,
      tags: body.tags ?? [],
      helpfulCount: 0,
      freshnessStatus: 'fresh' as const,
      freshnessScore: 1.0,
      minutesAgo: 0,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    }
    return {
      checkin: newCheckin,
      reward: { helpfulReceived: 0, totalCheckins: 1, streakDays: 1 },
    } satisfies CreateCheckinResponse
  }],

  ['/api/v1/users/me/stats', () => ({
    totalCheckins: 7, helpfulReceived: 14, streakDays: 3,
    activityTitle: '단골 리포터', influenceTitle: '친절한 이웃',
  })],
]

const originalFetch = window.fetch

export function installMocks() {
  window.fetch = async (input, init) => {
    const url = new URL(
      typeof input === 'string' ? input : input instanceof URL ? input.href : input.url,
      window.location.origin,
    )

    for (const [pattern, handler] of ROUTES) {
      if (url.pathname.startsWith(pattern)) {
        await new Promise(r => setTimeout(r, 300))  // 네트워크 지연 시뮬레이션
        return new Response(JSON.stringify(handler(url, init)), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    return originalFetch(input, init)
  }
}
