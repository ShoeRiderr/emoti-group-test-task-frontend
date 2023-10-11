import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login } from '@/api/security'
import type { LoginPayload } from '@/interfaces/api/SecurityInterfaces'
import type { User } from '@/interfaces/User'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref<Boolean>(false)
  const user = ref<User>()
  const errors = ref<any>()
  const isAdmin = computed<Boolean>(() => user.value?.roles.includes('ROLE_ADMIN') ?? false)
  const userToken = ref<string>('')

  async function logIn(payload: LoginPayload): Promise<void> {
    try {
      user.value = await (await login(payload)).data
      userToken.value = user.value?.token ?? ''

      localStorage.setItem('userId', user.value?.id?.toString() ?? '')
      localStorage.setItem('userToken', userToken.value)

      errors.value = undefined
      isLoggedIn.value = true
    } catch (error) {
      isLoggedIn.value = false
    }
  }

  async function logOut(): Promise<void> {
    localStorage.setItem('userId', '')
    localStorage.setItem('userToken', '')

    errors.value = undefined
    user.value = undefined
    isLoggedIn.value = false
  }

  return { isLoggedIn, user, isAdmin, errors, userToken, logIn, logOut }
})
