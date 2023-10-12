<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useReservationStore } from "@/stores/reservation";
import ReservationTable from "@/components/Reservations/ReservationTable.vue";
import { axiosInstance } from "@/api/axiosDefaults";

const reservationStore = useReservationStore();
const authStore = useAuthStore();

const reservations = computed(() => reservationStore.reservations);
const reservationList = computed(() => reservations.value?.["hydra:member"] ?? []);
const isFirstPage = computed(
  () => reservations.value?.["hydra:view"]?.["hydra:previous"] === undefined
);
const isLastPage = computed(
  () => reservations.value?.["hydra:view"]?.["hydra:next"] === undefined
);
const currentPage = computed(() => {
  if (isFirstPage.value) {
    return 1;
  } else if (isLastPage.value) {
    const previousEndponint =
      reservations.value?.["hydra:view"]?.["hydra:previous"] ?? "";

    return +previousEndponint.substring(previousEndponint.length - 1) + 1;
  }

  return 0;
});
onMounted(() => {
  reservationStore.getAllReservations();
});

async function handleRequest(endpoint: string) {
  try {
    reservationStore.reservations = await (
      await axiosInstance.get(endpoint, {
        headers: {
          "X-API-TOKEN": authStore.userToken,
        },
      })
    ).data;
  } catch (error: any) {
    reservationStore.errors = error;
  }
}
</script>

<template>
  <div class="mt-4 mb-4">
    <ReservationTable :reservations="reservationList" />
    <div class="flex md:justify-end justify-center mt-2">
      <ul class="flex flex-row space-x-px text-sm">
        <li>
          <button
            v-if="!isFirstPage"
            type="button"
            @click.prevent="
              handleRequest(reservations?.['hydra:view']?.['hydra:previous'])
            "
            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Poprzednia strona
          </button>
        </li>
        <li>
          <div
            class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            {{ currentPage }}
          </div>
        </li>
        <li>
          <button
            v-if="!isLastPage"
            type="button"
            @click.prevent="handleRequest(reservations?.['hydra:view']?.['hydra:next'])"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Następna strona
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
