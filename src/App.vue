<script setup>
import { OrbitSpinner } from 'epic-spinners'
import { RouterView, useRoute } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppLayout from './layouts/AppLayout.vue'
import { useFirebaseAuth} from "vuefire";
import { useStore } from "@/store/store"
const route = useRoute()
const auth = useFirebaseAuth()
const store = useStore();
// Listen for changes in authentication state
// store.setSpinner();
// console.log(store.spin);
// auth.onAuthStateChanged((authUser) => {
//   if (authUser) {
//     // User is signed in
//     store.setUser(true);
//     console.log(1);
//   } else {
//     // User is signed out
//     store.setUser(false);
//     console.log(2);
//   }
//   store.setSpinner();
//   console.log(store.spin);
// });
</script>

<template>
  <orbit-spinner v-if="store.spin" class="orbit-spinner" :animation-duration="1200" :size="55" color="#469764"/>
  <AppLayout v-else>
    <template v-slot:topbar>
      <AppNavbar/>
    </template>
    <template v-slot:content>
      <Suspense>
        <RouterView :key="route.fullPath" />
        <template v-slot:fallback>
          <p>Content not found. Contact your developer for more info.</p>
        </template>
      </Suspense>
    </template>
  </AppLayout>
</template>

<style>
  .orbit-spinner{
    position: absolute;
    top: 50%;
    left: 50%;
    height: 55px;
    width: 55px;
    margin: 0 auto;
  }
  .orbit-spinner .orbit:nth-child(1) {
    border-bottom: 3px solid #ff1d5e !important;
  }
  .orbit-spinner .orbit:nth-child(3) {
    border-top: 3px solid #5c5dc1;
}
</style>
