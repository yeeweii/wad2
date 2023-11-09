// Utilities
import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', {
  state: () => ({
    //
    companyName: "Pharma-Save",
    authUser: null,


  }),
  actions: {
    getLastName() {
      return this.webName;
      
    },
  },
  getters: {
    user : (state) => state.authUser
  }
})


