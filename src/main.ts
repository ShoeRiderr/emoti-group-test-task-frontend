import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'
import { getUser } from './api/users'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')

const authStore = useAuthStore()

router.beforeEach(async (to, from, next) => {
  const userToken = localStorage.getItem('userToken')
  const userId = localStorage.getItem('userId')
  const isUnauthenticated =
    userToken == null || userToken.length === 0 || userId == null || userId.length === 0
  let user = null
  if (!isUnauthenticated) {
    user = await (await getUser(+userId)).data

    authStore.isLoggedIn = true
    authStore.user = user
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isUnauthenticated) {
      next({
        name: 'login'
      })
    } else {
      if (!user) {
        next({
          name: 'login'
        })
      } else {
        next()
      }
    }
  } else {
    if ((to.name == 'login' || to.name == 'register') && user) {
      next({
        name: 'vacancies'
      })
    }

    next()
  }
})
