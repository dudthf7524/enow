import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNearbyPlaces, getPlaceDetail } from '@/api/places'
import { createCheckin, voteHelpful } from '@/api/checkins'
import type { CreateCheckinBody } from '@/types'

export function useNearbyPlaces(lat: number | null, lng: number | null) {
  return useQuery({
    queryKey: ['places', 'nearby', lat, lng],
    queryFn: () => getNearbyPlaces({ lat: lat!, lng: lng! }),
    enabled: lat !== null && lng !== null,
    refetchInterval: 60_000,
    staleTime: 30_000,
  })
}

export function usePlaceDetail(kakaoPlaceId: string | null) {
  return useQuery({
    queryKey: ['places', kakaoPlaceId],
    queryFn: () => getPlaceDetail(kakaoPlaceId!),
    enabled: !!kakaoPlaceId,
    refetchInterval: 30_000,
  })
}

export function useCreateCheckin() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateCheckinBody) => createCheckin(body),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['places', variables.kakaoPlaceId] })
      qc.invalidateQueries({ queryKey: ['places', 'nearby'] })
    },
  })
}

export function useVoteHelpful() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (checkinId: number) => voteHelpful(checkinId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['places'] })
    },
  })
}
