import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import { useFirebaseAuth} from "vuefire";
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
  const auth = useFirebaseAuth()
  const store = useStore();
  store.setSpinner();
  console.log(store.spin);
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      // User is signed in
      store.setUser(true);
      console.log(1);
    } else {
      // User is signed out
      store.setUser(false);
      console.log(2);
    }
    store.setSpinner();
    console.log(store.spin);
  });
  const isAuthenticated = store.user /*check if user is authenticated */;

  if (requiresAuth && !isAuthenticated) {
    console.log("Router 1 ==> ", isAuthenticated, from);
    next({ name: 'sign-in' })
  } else {
    console.log("Router 2==> ", isAuthenticated,from);
    next()
  }
})
export default router