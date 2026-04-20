import { request } from './client'
import type { CreateCheckinBody, CreateCheckinResponse } from '@/types'

export function createCheckin(body: CreateCheckinBody): Promise<CreateCheckinResponse> {
  return request('/api/v1/checkins', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function voteHelpful(checkinId: number): Promise<{ helpfulCount: number }> {
  return request(`/api/v1/checkins/${checkinId}/helpful`, { method: 'POST' })
}
