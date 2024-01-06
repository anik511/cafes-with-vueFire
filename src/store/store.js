import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    user: false,
    spin: false,
  }),
  actions: {
    setUser(payload) {
        this.user = !!payload
        console.log("setUser ===>",this.user);
    },
    setSpinner() {
      this.spin = !this.spin;
    }
  }
})