<script setup>
import { useFirebaseAuth } from 'vuefire';
import { signOut } from 'firebase/auth';
import BaseButton from './base/BaseButton.vue'
import { useStore } from "@/store/store"
const store = useStore();

const auth = useFirebaseAuth();
async function signOutOfCafe() {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Logged out');
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });
}
</script>

<template>
  <nav class="pr-4">
    <BaseButton to="/">Home</BaseButton>
    <BaseButton to="/new">New</BaseButton>
    <BaseButton v-if="store.user" @click="signOutOfCafe">Sign-Out</BaseButton>
    <BaseButton v-else to="/sign-in">Sign-In</BaseButton>
  </nav>
</template>

<style></style>