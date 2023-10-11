import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchVacancies } from '@/api/vacancies'
import type { VacancyCollection } from '@/interfaces/Vacancy'
import type { VacancyFilterPayload } from '@/interfaces/api/VacancyFilterPayload'
import { useAuthStore } from './auth'
import { userToken } from '@/utils/localStorage'

export const useVacancyStore = defineStore('vacancy', () => {
  const vacancies = ref<VacancyCollection>()
  const totalPrice = ref<Number>(0)
  const errors = ref<any>()

  const authStore = useAuthStore();

  const apiToken = computed(() => authStore.userToken ?? userToken);

  async function fetchAll(payload: VacancyFilterPayload): Promise<void> {
    try {
      vacancies.value = await (await fetchVacancies(payload, apiToken.value)).data
      totalPrice.value = (Number(vacancies.value?.totalPrice ?? 0) * Number(payload.free)) / 100
      errors.value = undefined
    } catch (error) {
      errors.value = error
    }
  }

  return { errors, vacancies, totalPrice, fetchAll }
})
