<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import { RouterView } from "vue-router";
import Footer from "@/components/Footer.vue";
import Notifications from "@/components/Notifications.vue";
</script>

<template>
  <div class="flex flex-col h-screen">
    <Notifications />
    <NavBar />
    <div class="container flex-grow mx-auto px-4">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
