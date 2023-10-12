import type { VacancyFilterPayload } from '@/interfaces/api/VacancyFilterPayload'
import { axiosInstance } from './axiosDefaults'

const apiUrl = import.meta.env.VITE_API_URL

export async function fetchVacancies(params: VacancyFilterPayload, apiToken: string) {
  return axiosInstance.get(`/api/vacancies`, {
    params: params,
    headers: {
      'X-API-TOKEN': apiToken,
      'Content-Type': 'application/ld+json'
    }
  })
}
