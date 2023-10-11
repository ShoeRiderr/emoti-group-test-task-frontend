<script setup lang="ts">
const props = defineProps(["reservation"]);
</script>

<template>
  <div>
    {{ props.reservation.id }}
  </div>
</template>
