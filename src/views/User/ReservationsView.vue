<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import ReservationItem from "@/components/Reservations/ReservationItem.vue";

const authStore = useAuthStore();

const reservations = computed(() => authStore.user?.reservations);
</script>

<template>
  <div>
    <ReservationItem
      v-for="(reservation, key) in reservations"
      :key="key"
      :reservation="reservation"
    />
  </div>
</template>
