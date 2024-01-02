import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
// import { useStore } from "@/store/store"
// const store = useStore();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,

    },
    {
      path: '/new',
      name: 'new-cafe',
      component: () => import('@/views/NewCafePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cafe/:id',
      name: 'edit-cafe',
      component: () => import('@/views/EditCafePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/SignInPage.vue'),
    },
  ],
})

// const user = useCurrentUser()
// router.beforeEach((to, from, next) => {
  
//   if (!user?.email) next({ name: 'sign-in' })
//   else next()
// })
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = false /* store.user check if user is authenticated */;

    // pinia.js?v=23e363d9:1339 Uncaught Error: [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
    // See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
    // This will fail in production.
    // at useStore (pinia.js?v=23e363d9:1339:13)
    // at index.js:4:15

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'sign-in' })
  } else {
    next()
  }
})
export default router