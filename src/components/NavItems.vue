<script setup>
import { useFirebaseAuth } from 'vuefire';
import { signOut } from 'firebase/auth';
import BaseButton from './base/BaseButton.vue'
import { useStore } from "@/store/store"
import { useRouter } from 'vue-router'
const store = useStore();
const router = useRouter()
const auth = useFirebaseAuth();
async function signOutOfCafe() {
  signOut(auth).then(() => {
    // Sign-out successful.
    store.setUser(false)
    router.push('/')
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });
}
</script>

<template>
  <nav class="pr-4">
    <BaseButton to="/">Home</BaseButton>
    <BaseButton v-if="store.user" to="/new">New</BaseButton>
    <BaseButton v-if="store.user" @click="signOutOfCafe">Sign-Out</BaseButton>
    <BaseButton v-else="!store.user" to="/sign-in">Sign-In</BaseButton>
  </nav>
</template>

<style></style>