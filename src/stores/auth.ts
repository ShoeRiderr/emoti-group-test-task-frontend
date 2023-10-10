import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, logout } from '@/api/security'
import type { LoginPayload } from '@/interfaces/api/SecurityInterfaces'
import type { User } from '@/interfaces/User'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref<Boolean>(false)
  const user = ref<User>({})

  async function logIn(payload: LoginPayload) {
    try {
      user.value = await (await login(payload)).data

      localStorage.setItem('userId', user.value.id?.toString() ?? '')
      localStorage.setItem('userToken', user.value.token ?? '')

      isLoggedIn.value = true
    } catch (error) {
      console.log(error)
      isLoggedIn.value = false
    }
  }

  async function logOut() {
    try {
      await logout()

      localStorage.setItem('userId', '')
      localStorage.setItem('userToken', '')

      user.value = {}
      isLoggedIn.value = false
    } catch (error) {
      isLoggedIn.value = true
    }
  }

  return { isLoggedIn, user, logIn, logOut }
})
