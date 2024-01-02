import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    user: false
  }),
  actions: {
    increment(payload) {
        this.user = !!payload
    }
  }
})