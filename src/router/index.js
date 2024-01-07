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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = useFirebaseAuth();
  const store = useStore();
  store.setSpinner();
  console.log(store.spin);

  try {
    const authUser = await new Promise((resolve) => {
      auth.onAuthStateChanged((user) => resolve(user));
    });

    if (authUser) {
      // User is signed in
      store.setUser(true);
      console.log(1);
    } else {
      // User is signed out
      store.setUser(false);
      console.log(2);
    }
    const isAuthenticated = store.user;

    if (requiresAuth && !isAuthenticated) {
      console.log("Router 1 ==> ", isAuthenticated, from);
      next({ name: 'sign-in' });
    } else {
      console.log("Router 2 ==> ", isAuthenticated, from);
      next();
    }
  } catch (error) {
    console.error("Error in beforeEach:", error);
    next(false);
  }finally {
    store.setSpinner();
    console.log(store.spin);
  }
});
export default router