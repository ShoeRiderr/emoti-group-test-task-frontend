export default [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: () => import('@/views/VacanciesView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: import('@/views/ReservationView.vue'),
      meta: {
        requiresAuth: true,
        onlyAdmin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/user/:id',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/UserView.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'profile',
          name: 'user-profile',
          component: import('@/views/User/ProfileView.vue')
        },
        {
          path: 'reservations',
          name: 'user-reservations',
          component: import('@/views/User/ReservationsView.vue')
        }
      ]
    }
  ]