import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    user: false
  }),
  actions: {
    setUser(payload) {
        this.user = !!payload
    }
  }
})