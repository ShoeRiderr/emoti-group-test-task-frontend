import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { reservateVacancies, fetchReservations } from '@/api/reservations'
import type { VacancyFilterPayload } from '@/interfaces/api/VacancyFilterPayload'
import type { ReservationSavePayload } from '@/interfaces/api/ReservationSavePayload'
import type { Reservation, ReservationCollection } from '@/interfaces/Reservation'
import { userToken } from '@/utils/localStorage'
import { useAuthStore } from './auth'

export const useReservationStore = defineStore('reservation', () => {
  const reservations = ref<ReservationCollection>()
  const reservation = ref<Reservation>()
  const errors = ref<any>()

  const authStore = useAuthStore();

  const apiToken = computed(() => authStore.userToken ?? userToken);

  async function getAllReservations(): Promise<void> {
    try {
      reservations.value = await (await fetchReservations(apiToken.value)).data
      errors.value = undefined
    } catch (error) {
      errors.value = error
    }
  }

  async function reservate(payload: VacancyFilterPayload): Promise<void> {
    try {
      const fixedPayload = <ReservationSavePayload>{
        startDate: payload.startDate,
        endDate: payload.endDate,
        bookedPlaces: payload.free
      }

      reservation.value = await (await reservateVacancies(fixedPayload, apiToken.value)).data
      errors.value = undefined
    } catch (error) {
      errors.value = error
    }
  }

  return { errors, reservations, reservation, getAllReservations, reservate }
})
