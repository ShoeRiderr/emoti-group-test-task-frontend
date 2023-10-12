<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useVacancyStore } from "@/stores/vacancy";
import { useReservationStore } from "@/stores/reservation";
import type { VacancyFilterPayload } from "@/interfaces/api/VacancyFilterPayload";
import VacancyCalendar from "@/components/Vacancies/VacancyCalendar.vue";
import { formatDate } from "@/utils/dateUtil";

const vacancyStore = useVacancyStore();
const reservationStore = useReservationStore();

const filterForm = ref<VacancyFilterPayload>({
  startDate: "",
  endDate: "",
  free: 1,
});

onMounted(async () => {
  // set minimum value on today for start date
  let today = await formatDate();

  document.getElementById("startDate").setAttribute("min", today);
});

//> Computed
const filteredVacancies = computed(() => vacancyStore.filteredVacancies);

const totalPrice = computed(() => vacancyStore.totalPrice);

const hasFilteredVacancies = computed(
  () => filteredVacancies.value?.data?.length && filteredVacancies.value.data.length > 0
);

const reservationErrors = computed(() => reservationStore.errors);

const hasReservationErrors = computed(() => reservationErrors.value.length > 0);
//< Computed

async function searchVacancies() {
  await vacancyStore.fetchAll(filterForm.value);
}

async function onReservate() {
  try {
    await reservationStore.reservate(filterForm.value);

    if (!hasReservationErrors.value) {
      cancel();
    }

    vacancyStore.fetchAll();
  } catch (error: any) {
    reservationStore.errors = error;
  }
}

function cancel() {
  filterForm.value = {
    startDate: "",
    endDate: "",
    free: 1,
  };

  vacancyStore.totalPrice = 0;

  vacancyStore.filteredVacancies = undefined;
}
</script>

<template>
  <div class="mt-4 mb-4">
    <h2 class="lg:text-3xl text-2xl">Zarezerwuj pobyt</h2>
    <div class="flex lg:flex-row flex-col lg:space-x-4 lg:space-y-0 space-y-4 pt-4">
      <div class="flex-none lg:w-2/5 w-full space-y-4">
        <form @submit.prevent="searchVacancies" class="space-y-2">
          <div>
            <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900">
              Od
            </label>
            <input
              v-model="filterForm.startDate"
              id="startDate"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
              type="date"
              placeholder="Od"
              required="true"
            />
          </div>
          <div>
            <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900">
              Do
            </label>
            <input
              v-model="filterForm.endDate"
              id="endDate"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
              type="date"
              required="true"
            />
          </div>
          <div>
            <label for="free" class="block mb-2 text-sm font-medium text-gray-900">
              Ilość miejsc
            </label>
            <input
              v-model="filterForm.free"
              id="free"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
              type="number"
              min="1"
              step="1"
              pattern="\d*"
            />
          </div>
          <div class="flex lg:justify-start justify-end">
            <button
              class="lg:w-full w-2/5 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Szukaj
            </button>
          </div>
        </form>
        <!-- Filtered vacancies -->
        <div>
          <div v-if="hasFilteredVacancies">
            <div class="space-x-2 flex justify-center align-middle">
              <div class="xl:px-5 xl:py-2.5 lg:px-3 lg:py-2 px-1.5 py-1.5">
                Kwota do zapłaty: {{ totalPrice }}
              </div>
              <button
                @click.prevent="onReservate"
                class="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm xl:px-5 xl:py-2.5 lg:px-3 lg:py-2 px-2.5 py-1.5 text-center"
              >
                Rezerwuj
              </button>
              <button
                @click.prevent="cancel"
                class="text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm xl:px-5 xl:py-2.5 lg:px-3 lg:py-2 px-2.5 py-1.5 text-center"
              >
                Anuluj
              </button>
            </div>
          </div>
          <div v-else>Brak wolnych miejsc w podanym przedziale dat.</div>
        </div>
      </div>
      <!-- Calendar -->
      <VacancyCalendar class="flex-initial lg:w-4/5 w-full lg:mt-0" />
    </div>
  </div>
</template>
