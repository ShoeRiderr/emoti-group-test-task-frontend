<script setup lang="ts">
const props = defineProps(["vacancy"]);
</script>

<template>
  <div>
    {{ props.vacancy.id }}
  </div>
</template>
