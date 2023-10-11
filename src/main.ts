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
    user = await (await getUser(+userId, userToken)).data

    authStore.isLoggedIn = true
    authStore.user = user
  }

  // Check if endpoint requires authorization
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if user is authenticated. If not, redirect to login page.
    if (isUnauthenticated) {
      next({
        name: 'login'
      })
    } else {
      // If storage variable says that user is logged in but can't find any user with sended api token
      // then redirect to login page
      if (!user) {
        next({
          name: 'login'
        })
      } else {
        // Check if user requires admin privileges to visit the page.
        if (to.matched.some((record) => record.meta.onlyAdmin)) {
          // If user is not admin, redirect to dashboard page
          if (!authStore.isAdmin) {
            next({
              name: 'dashboard'
            })
          }
        }

        // If every above conditions were not true then process the request
        next()
      }
    }
  } else {
    // Check if logged in user try to visit login or register page
    if ((to.name == 'login' || to.name == 'register') && user) {
      // If the condition is true then redirect user to dashboard
      next({
        name: 'dashboard'
      })
    }

    // If every above conditions were not true then process the request
    next()
  }
})
