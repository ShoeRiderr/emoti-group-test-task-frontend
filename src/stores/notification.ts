import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification } from '@/interfaces/Notification'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref<Notification>()

  return { message }
})
