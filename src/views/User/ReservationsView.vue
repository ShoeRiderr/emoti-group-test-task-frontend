<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import ReservationTable from "@/components/Reservations/ReservationTable.vue";

const authStore = useAuthStore();

const reservations = computed(() => authStore.user?.reservations);
</script>

<template>
  <div>
    <ReservationTable :reservations="reservations" />
  </div>
</template>
