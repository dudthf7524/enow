import { request } from './client'
import type { NearbyPlacesParams, NearbyPlacesResponse, PlaceDetailResponse } from '@/types'

export function getNearbyPlaces(params: NearbyPlacesParams): Promise<NearbyPlacesResponse> {
  const q = new URLSearchParams({
    lat:    String(params.lat),
    lng:    String(params.lng),
    radius: String(params.radius ?? 500),
    ...(params.keyword ? { keyword: params.keyword } : {}),
  })
  return request(`/api/v1/places/nearby?${q}`)
}

export function getPlaceDetail(kakaoPlaceId: string): Promise<PlaceDetailResponse> {
  return request(`/api/v1/places/${kakaoPlaceId}`)
}
