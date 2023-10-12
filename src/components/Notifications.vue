<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useNotificationStore } from "@/stores/notification";
import type { Notification } from "@/interfaces/Notification";

const showNotification = ref<Boolean>(false);
const notificationStore = useNotificationStore();

const message = computed((): Notification => notificationStore.message);

watch(message, async (newMessage, oldMessage) => {
  if (newMessage != undefined) {
    showNotification.value = true;
    const duration = newMessage.duration ?? 3000;
    await setTimeout(() => {
      showNotification.value = false;
      notificationStore.message = undefined;
    }, duration);
  }
});
</script>

<template>
  <div
    v-if="showNotification"
    class="absolute z-index-50 inset-x-0 top-0"
    :class="message?.rootClass"
  >
    <div>
      <h3>{{ message.title }}</h3>
      <h3>{{ message.content }}</h3>
    </div>
  </div>
</template>
