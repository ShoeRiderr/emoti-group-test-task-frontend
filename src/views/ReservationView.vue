<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useReservationStore } from "@/stores/reservation";
import ReservationItem from "@/components/Reservations/ReservationItem.vue";

const reservationStore = useReservationStore();

const reservations = computed(() => reservationStore.reservations);
const reservationList = computed(() => reservations.value?.["hydra:member"] ?? []);

onMounted(() => {
  reservationStore.getAllReservations();
});
</script>

<template>
  <div>
    <ReservationItem
      v-for="(reservation, key) in reservationList"
      :key="key"
      :reservation="reservation"
    />
  </div>
</template>
