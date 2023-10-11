<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<template>
  <div>
    {{ user?.id }}
    {{ user?.name }}
    {{ user?.email }}
    {{ user?.roles }}
  </div>
</template>
