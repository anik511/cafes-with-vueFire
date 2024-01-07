<script setup>
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
import { doc, updateDoc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseForm from '@/components/base/BaseForm.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import FormLayout from '@/layouts/FormLayout.vue'

const db = useFirestore()
const route = useRoute()
const router = useRouter()
const docRef = doc(db, "cafes", route.params.id);
const cafeData = useDocument(docRef)

const loading = ref(false)
const editCafe = ref({
  name: '',
  location: 'United States',
  rating: 0,
  price: 1,
  description: '',
  favorite: true,
})
function isInvalid(value) {
  console.log(value);
  return value === null || value === undefined || typeof(value) !== 'number'? value.trim() === '':false;
}
watch(cafeData, (cafeData)=>{
    editCafe.value = {...cafeData,}
})

async function updateCafe() {
  loading.value = true;
  try {
    // Input validation
    if (isInvalid(editCafe.value.name) || isInvalid(editCafe.value.location) || isInvalid(editCafe.value.price)) {
      return;
    }
    const updateCafeDoc = await updateDoc(docRef, {
        ...editCafe.value
    });
    Swal.fire({
      title: "Success",
      text: "Cafe Updated Successfully",
      icon: "success",
    }).then((result) => {
      router.push('/')
    });
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
  <FormLayout>
    <template v-slot:title>
      <h1 class="mb-4">Edit - {{ cafeData?.name ? cafeData.name : '' }}</h1>
    </template>
    <template v-slot:content>
      <BaseCard>
        <template v-slot:default>
          <BaseForm v-if="editCafe">
            <BaseInput
              v-model="editCafe.name"
              label="Name"
              required
              placeholder="Cafe with a Vue"
            />
            <BaseInput v-model="editCafe.location" label="Location" required />
            <BaseInput
              v-model.number="editCafe.price"
              label="Price"
              type="number"
              min="1"
              max="4"
              required
            />
            <BaseInput
              v-model.number="editCafe.rating"
              label="Rating"
              type="number"
              min="0"
              max="5"
              step="0.5"
              required
            />
            <BaseInput v-model="editCafe.description" label="Description" />
            <BaseCheckbox v-model="editCafe.favorite" label="Favorite" />
          </BaseForm>
        </template>
        <template v-slot:actions>
          <BaseButton :loading="loading" :disabled="loading || isInvalid(editCafe.name) || isInvalid(editCafe.location) || isInvalid(editCafe.price)" @click="updateCafe" variant="tonal" color="success">
            Save Changes
          </BaseButton>
          <BaseButton :to="{name:'home'}" variant="tonal" color="error" outline>
            Cancel
          </BaseButton>
        </template>
      </BaseCard>
    </template>
  </FormLayout>
</template>

<style></style>