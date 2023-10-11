<script setup lang="ts">
import { ref, computed } from "vue";
import { useVacancyStore } from "@/stores/vacancy";
import { useReservationStore } from "@/stores/reservation";
import type { VacancyFilterPayload } from "@/interfaces/api/VacancyFilterPayload";
import VacancyCalendar from '@/components/Vacancies/VacancyCalendar.vue'

const filterForm = ref<VacancyFilterPayload>({
  startDate: "",
  endDate: "",
  free: 1,
});

const vacancyStore = useVacancyStore();
const reservationStore = useReservationStore();

const vacancies = computed(() => vacancyStore.vacancies);
const totalPrice = computed(() => vacancyStore.totalPrice);
const hasVacancies = computed(
  () =>
    vacancies.value?.["hydra:member"]?.length &&
    vacancies.value?.["hydra:member"]?.length > 0
);

const reservationErrors = computed(() => reservationStore.errors);
const hasReservationErrors = computed(() => reservationErrors.value.length > 0);

async function searchVacancies() {
  await vacancyStore.fetchAll(filterForm.value);
}

async function onReservate() {
  await reservationStore.reservate(filterForm.value);

  if (!hasReservationErrors.value) {
    cancel();
  }
}

function cancel() {
  filterForm.value = {
    startDate: "",
    endDate: "",
    free: 1,
  };

  vacancyStore.totalPrice = 0;

  vacancyStore.vacancies = undefined;
}
</script>
<template>
  <div>
    <div>
      Rezerwacja
      <form @submit.prevent="searchVacancies">
        <div>
          <label for="">Od</label>
          <input v-model="filterForm.startDate" type="date" required="true" />
        </div>
        <div>
          <label for="">Do</label>
          <input v-model="filterForm.endDate" type="date" required="true" />
        </div>
        <div>
          <label for="">Ilość miejsc</label>
          <input v-model="filterForm.free" type="number" min="1" step="1" pattern="\d*" />
        </div>
        <button>Szukaj</button>
      </form>
    </div>
    <!-- Filtered vacancies -->
    <div>
      <div v-if="hasVacancies">
        Kwota do zapłaty: {{ totalPrice }}
        <button @click.prevent="onReservate">Rezerwuj</button>
        <button @click.prevent="cancel">Anuluj</button>
      </div>
      <div v-else>Brak wolnych miejsc w podanym przedziale dat.</div>
    </div>
    <!-- Calendar -->
    <VacancyCalendar />
  </div>
</template>
