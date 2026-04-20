export type CongestionLevel = 1 | 2 | 3
export type NoiseLevelType  = 1 | 2 | 3
export type WifiQualityType = 1 | 2 | 3
export type FreshnessStatus = 'fresh' | 'recent' | 'stale'

// ── 사용자 ────────────────────────────────────────

export interface UserBrief {
  id: number
  nickname: string
  activityTitle: string
  influenceTitle?: string
}

export interface UserStats {
  totalCheckins: number
  helpfulReceived: number
  streakDays: number
  activityTitle: string
  influenceTitle?: string
}

// ── 장소 ─────────────────────────────────────────

export interface Place {
  id: number
  kakaoPlaceId: string
  name: string
  roadAddress: string
  address: string
  latitude: number
  longitude: number
  categoryCode: string
  kakaoUrl?: string
  distanceMeters?: number
  latestCheckin: CheckinSummary | null
}

export interface CheckinSummary {
  congestionLevel: CongestionLevel
  tags: string[]
  freshnessStatus: FreshnessStatus
  freshnessScore: number
  minutesAgo: number
  helpfulCount: number
}

// ── 제보 ─────────────────────────────────────────

export interface Checkin {
  id: number
  user: UserBrief
  congestionLevel: CongestionLevel
  noiseLevel?: NoiseLevelType
  outletAvailable?: boolean
  wifiQuality?: WifiQualityType
  tags: string[]
  memo?: string
  helpfulCount: number
  freshnessStatus: FreshnessStatus
  freshnessScore: number
  minutesAgo: number
  createdAt: string
  expiresAt: string
  votedHelpful?: boolean
}

// ── API Request ───────────────────────────────────

export interface NearbyPlacesParams {
  lat: number
  lng: number
  radius?: number
  keyword?: string
}

export interface CreateCheckinBody {
  kakaoPlaceId: string
  congestionLevel: CongestionLevel
  noiseLevel?: NoiseLevelType
  outletAvailable?: boolean
  wifiQuality?: WifiQualityType
  tags?: string[]
  memo?: string
}

// ── API Response ──────────────────────────────────

export interface NearbyPlacesResponse {
  places: Place[]
  meta: { total: number; radius: number }
}

export interface PlaceDetailResponse {
  place: Place
  checkins: Checkin[]
  checkinCount: number
}

export interface CreateCheckinResponse {
  checkin: Checkin
  reward: {
    newActivityTitle?: string
    newInfluenceTitle?: string
    helpfulReceived: number
    totalCheckins: number
    streakDays: number
  }
}

export interface ApiError {
  code: string
  message: string
}
