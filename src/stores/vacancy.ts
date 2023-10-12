import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchVacancies } from '@/api/vacancies'
import type { FilteredVacancyCollection, VacancyCollection } from '@/interfaces/Vacancy'
import type { VacancyFilterPayload } from '@/interfaces/api/VacancyFilterPayload'
import { useAuthStore } from './auth'
import { userToken } from '@/utils/localStorage'

export const useVacancyStore = defineStore('vacancy', () => {
  const vacancies = ref<VacancyCollection>()
  const filteredVacancies = ref<FilteredVacancyCollection>()
  const totalPrice = ref<Number>(0)
  const errors = ref<any>()

  const authStore = useAuthStore()

  const apiToken = computed(() => (authStore.userToken === '' ? authStore.userToken : userToken))

  async function fetchAll(payload: VacancyFilterPayload = {}): Promise<void> {
    try {
      const result = await (await fetchVacancies(payload, apiToken.value)).data
      if (
        Object.keys(payload).includes('excludeNotAvailable') ||
        Object.keys(payload).includes('excludePast') ||
        Object.keys(payload).includes('itemsPerPage') ||
        Object.keys(payload).length === 0
      ) {
        vacancies.value = result
      } else {
        filteredVacancies.value = result
        totalPrice.value = (Number(filteredVacancies.value?.totalPrice ?? 0) * Number(payload.free)) / 100
      }

      errors.value = undefined
    } catch (error) {
      errors.value = error
    }
  }

  return { errors, vacancies, filteredVacancies, totalPrice, fetchAll }
})
