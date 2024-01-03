<script setup>
import { RouterView, useRoute } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppLayout from './layouts/AppLayout.vue'
import { useFirebaseAuth, useCurrentUser } from "vuefire";
import { useStore } from "@/store/store"
const route = useRoute()
const auth = useFirebaseAuth()
console.log("auth ==>", auth);
const user = useCurrentUser()
console.log("user ===>", user, user.value);
const store = useStore();
store.setUser(!!user.value)
</script>

<template>
  <AppLayout>
    <template v-slot:topbar>
      <AppNavbar />
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

<style></style>
