import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase.js'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia()
const app = createApp(App)
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [VueFireAuth()],
})
app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(VueSweetalert2)

app.mount('#app')
