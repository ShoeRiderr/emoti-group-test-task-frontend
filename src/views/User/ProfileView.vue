<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isAdmin = computed(() => authStore.isAdmin);
</script>

<template>
  <div class="text-2xl space-y-2">
    <div>
      <span class="font-semibold"> Imię: </span>
      {{ user?.name }}
    </div>
    <div>
      <span class="font-semibold"> Email: </span>
      {{ user?.email }}
    </div>
    <div>
      <span class="font-semibold"> Rola: </span>
      {{ isAdmin ? "Administrator" : "Użytkownik" }}
    </div>
  </div>
</template>
