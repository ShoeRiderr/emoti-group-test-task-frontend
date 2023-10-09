<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <!-- Logged in user -->
  <div class="">
    <RouterLink
      :to="{ name: 'register' }"
      class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    >
      Register
    </RouterLink>
    <RouterLink
      :to="{ name: 'login' }"
      class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    >
      Login
    </RouterLink>
  </div>
</template>