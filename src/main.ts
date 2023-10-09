import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import cors from 'cors';
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.use(cors);
app.mount('#app')

import { useAuthStore } from "@/stores/auth";
import { getUser } from './api/users'

const authStore = useAuthStore();

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const userToken = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
    if (userToken == null || userToken.length === 0 || userId == null || userId.length === 0) {
      next({
        name: "login"
      });
    } else {
      const user = await (await getUser(+userId)).data
      if (!user) {
        next({
          name: "login"
        });
      } else {
        authStore.isLoggedIn = true;
        authStore.user = user;
        next();
      }
    }
  } else {
    next();
  }
});
