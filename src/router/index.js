import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import { useStore } from "@/store/store"

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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const store = useStore();
  const isAuthenticated = store.user /*check if user is authenticated */;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'sign-in' })
  } else {
    next()
  }
})
export default router