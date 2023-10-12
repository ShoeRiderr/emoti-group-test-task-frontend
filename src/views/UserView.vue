<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div class="mt-4 mb-4">
    <div class="">
      <h2 class="text-4xl mb-2 pl-4">Twój profil</h2>
      <div class="grid md:grid-cols-2 grid-cols-10">
        <div
          class="flex flex-col max-w-sm rounded h-screen shadow-lg text-2xl space-y-2 p-4"
        >
          <RouterLink :to="{ name: 'user-profile' }">Profil</RouterLink>
          <RouterLink :to="{ name: 'user-reservations' }">Rezerwacje</RouterLink>
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
