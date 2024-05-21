import { defineStore } from 'pinia'
export const useAlertStore = defineStore('alert', {
  state: () => ({
    params: {
      state: false,
      type: 'info',
      icon: 'mdi-alert-circle',
      text: ''
    }
  }),
  actions: {
    setParamsAlert(data: Object) {
      this.params = data
      setTimeout(() => {
        this.params = {
          state: false,
          type: 'info',
          icon: 'mdi-alert-circle',
          text: ''
        }
      }, 2000)
    }
  },
  getters: {
    PARAMS(): Object {
      return this.params
    },
  }
})
