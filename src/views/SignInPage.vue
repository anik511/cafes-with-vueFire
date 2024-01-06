<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { useStore } from "@/store/store"
const router = useRouter()
const store = useStore();
const userInput = ref({
  email: '',
  password: '',
  visible: false,
})

const auth = useFirebaseAuth()

async function createUser() {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userInput.value.email,
      userInput.value.password
    );

    // User is logged in
    const user = userCredential.user;
    console.log("logged in", user, user.uid);
    store.setUser(!!user.uid);
    router.go(-1);
  } catch (error) {
    // Handle errors here
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error ${errorCode}: ${errorMessage}`);
  }
}

async function signInToFirebase() {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userInput.value.email,
      userInput.value.password
    );

    // User is signed in
    const user = userCredential.user;
    console.log("Signed in",user, user.uid);
    store.setUser(!!user.uid);
    router.go(-1);
  } catch (error) {
    // Handle errors here
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error ${errorCode}: ${errorMessage}`);
  }
}

</script>

<template>
  <BaseContainer>
    <h1 class="mb-4">Sign In</h1>
    <BaseCard>
      <template v-slot:default>
        <BaseForm>
          <BaseInput
            v-model="userInput.email"
            type="email"
            label="Email"
            required
            placeholder="eleanorshellstrop@thegoodplace.com"
          />
          <BaseInput
            v-model="userInput.password"
            label="Password"
            :append-inner-icon="userInput.visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="userInput.visible ? 'text' : 'password'"
            @click:append-inner="userInput.visible = !userInput.visible"
            required
          />
        </BaseForm>
      </template>
      <template v-slot:actions>
        <BaseButton @click="signInToFirebase" variant="tonal" color="success">
          Sign In
        </BaseButton>
        <BaseButton
          @click="createUser"
          variant="tonal"
          color="secondary"
          outline
        >
          Create New User
        </BaseButton>
      </template>
    </BaseCard>
  </BaseContainer>
</template>

<style></style>