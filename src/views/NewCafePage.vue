<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { collection, addDoc } from "firebase/firestore"; 
import { useFirestore } from 'vuefire'
import Swal from 'sweetalert2'
const router = useRouter()
const db = useFirestore()
const loading = ref(false)
const newCafe = ref({
  name: '',
  rating: 0,
  location: 'United States',
  price: 1,
  favorite: false,
});

function goBack() {
  router.push('/')
}
function isInvalid(value) {
  console.log(value);
  return value === null || value === undefined || typeof(value) !== 'number'? value.trim() === '':false;
}

function resetCafe(){
  newCafe.value.name = '';
  newCafe.value.rating = 0;
  newCafe.value.location = 'United States';
  newCafe.value.price = 1;
  newCafe.value.favorite = false;
}
// Add a new document with a generated id.
async function addCafe(){
  loading.value = true;
  try {
    // Input validation
    if (isInvalid(newCafe.value.name) || isInvalid(newCafe.value.location) || isInvalid(newCafe.value.price)) {
      return;
    }
    const newDoc = await addDoc(collection(db, "cafes"), {
      ...newCafe.value
    });
    
    if (newDoc.id) {
      Swal.fire({
        title: "Success",
        text: "Cafe Added Successfully",
        icon: "success",
      }).then((result) => {
        resetCafe()
        // router.push('/')
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Failed",
      text: "Some thing went wrong",
      icon: "warning",
    })
  }finally {
    loading.value = false;
  }
  
} 
</script>

<template>
  <BaseContainer>
    <h1 class="mb-4">New Cafe</h1>
    <BaseCard>
      <template v-slot:default>
        <BaseForm>
          <BaseInput
            v-model="newCafe.name"
            label="Name"
            type="text"
            required
            placeholder="Cafe with a Vue"
          />
          <BaseInput
            v-model.number="newCafe.rating"
            label="Rating"
            type="number"
            min="0"
            max="5"
            step="0.5"
            required
          />
          <BaseInput v-model="newCafe.location" label="Location" required />
          <BaseInput
            v-model.number="newCafe.price"
            label="Price"
            type="number"
            min="1"
            max="4"
            required
          />
          <BaseCheckbox v-model="newCafe.favorite" label="Favorite" />
        </BaseForm>
      </template>
      <template v-slot:actions>
        <BaseButton :loading="loading" :disabled="loading || isInvalid(newCafe.name) || isInvalid(newCafe.location) || isInvalid(newCafe.price)" @click="addCafe" variant="tonal" color="success">
          Add New Cafe
        </BaseButton>
        <BaseButton :to="{name:'home'}" variant="tonal" color="error" outline> Cancel </BaseButton>
      </template>
    </BaseCard>
  </BaseContainer>
</template>

<style></style>
