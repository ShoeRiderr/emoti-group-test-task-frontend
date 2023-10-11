<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div>
    <h2>Twój profil</h2>
    <div class="grid md:grid-cols-2 grid-cols-1">
      <div class="flex flex-col">
        <RouterLink :to="{name: 'user-profile'}">Profil</RouterLink>
        <RouterLink :to="{name: 'user-reservations'}">Rezerwacje</RouterLink>
      </div>
      <RouterView />
    </div>
  </div>
</template>