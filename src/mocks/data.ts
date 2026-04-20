import type { Place, Checkin } from '@/types'

const now = new Date()
const ago = (minutes: number) => new Date(now.getTime() - minutes * 60000).toISOString()

export const MOCK_PLACES: Place[] = [
  {
    id: 1, kakaoPlaceId: '26338954',
    name: '스타벅스 강남역점', roadAddress: '서울 강남구 테헤란로 212',
    address: '서울 강남구 역삼동 837', latitude: 37.4979, longitude: 127.0276,
    categoryCode: 'CE7', distanceMeters: 142,
    latestCheckin: {
      congestionLevel: 3, tags: ['noisy', 'outlet'],
      freshnessStatus: 'fresh', freshnessScore: 0.87, minutesAgo: 8, helpfulCount: 3,
    },
  },
  {
    id: 2, kakaoPlaceId: '11111111',
    name: '블루보틀 삼청점', roadAddress: '서울 종로구 북촌로 31-18',
    address: '서울 종로구 가회동 42', latitude: 37.5821, longitude: 126.9837,
    categoryCode: 'CE7', distanceMeters: 380,
    latestCheckin: {
      congestionLevel: 2, tags: ['quiet', 'wifi_good'],
      freshnessStatus: 'recent', freshnessScore: 0.45, minutesAgo: 75, helpfulCount: 1,
    },
  },
  {
    id: 3, kakaoPlaceId: '22222222',
    name: '카페 온더테이블', roadAddress: '서울 마포구 와우산로29나길 16',
    address: '서울 마포구 서교동 355-12', latitude: 37.5521, longitude: 126.9194,
    categoryCode: 'CE7', distanceMeters: 511,
    latestCheckin: null,
  },
  {
    id: 4, kakaoPlaceId: '33333333',
    name: '커피리브레 서교점', roadAddress: '서울 마포구 양화로6길 57',
    address: '서울 마포구 서교동 395-166', latitude: 37.5498, longitude: 126.9213,
    categoryCode: 'CE7', distanceMeters: 620,
    latestCheckin: {
      congestionLevel: 1, tags: ['quiet', 'study_ok', 'outlet'],
      freshnessStatus: 'fresh', freshnessScore: 0.95, minutesAgo: 3, helpfulCount: 5,
    },
  },
]

export const MOCK_CHECKINS: Checkin[] = [
  {
    id: 1,
    user: { id: 1, nickname: '탐험가제이', activityTitle: '공간 감별사' },
    congestionLevel: 3, tags: ['noisy', 'outlet'],
    memo: '1층은 꽉 찼고 2층은 자리 좀 있어요',
    helpfulCount: 3,
    freshnessStatus: 'fresh', freshnessScore: 0.87, minutesAgo: 8,
    createdAt: ago(8), expiresAt: ago(-172),
  },
  {
    id: 2,
    user: { id: 2, nickname: '커피조각상', activityTitle: '단골 리포터', influenceTitle: '친절한 이웃' },
    congestionLevel: 2, tags: ['wifi_good'],
    helpfulCount: 1,
    freshnessStatus: 'recent', freshnessScore: 0.65, minutesAgo: 42,
    createdAt: ago(42), expiresAt: ago(-138),
  },
]
