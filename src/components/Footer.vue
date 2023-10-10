<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const currYear = ref(new Date().getFullYear());
</script>

<template>
  <footer class="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
    <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
      © {{ currYear }} Copyright:
      <RouterLink
        class="text-neutral-800 dark:text-neutral-400"
        :to="{ name: 'dashboard' }"
      >
        Emoti group task
      </RouterLink>
    </div>
  </footer>
</template>