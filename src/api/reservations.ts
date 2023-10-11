import type { ReservationSavePayload } from '@/interfaces/api/ReservationSavePayload'
import { axiosInstance } from './axiosDefaults'

export async function fetchReservations(apiToken: string) {
  return axiosInstance.get(`/api/reservations`, {
    headers: {
      'X-API-TOKEN': apiToken
    }
  })
}

export async function reservateVacancies(params: ReservationSavePayload, apiToken: string) {
  return axiosInstance.post(`/api/reservations`, params, {
    headers: {
      'X-API-TOKEN': apiToken
    }
  })
}
