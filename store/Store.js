import {
  defineStore
} from 'pinia'

export const useStore = defineStore('auth', {
  state: () => ({
    user: {},
    LoggedIn: false,
    token: null
  }),
  getters: {
    authUser() {
      return this.user
    },
    isLoggedIn() {
      return this.LoggedIn
    }
  },
  actions: {
    async signIn(token) {
      this.token = token

      const user = await $fetch('http://127.0.0.1:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      this.user = user
      this.LoggedIn = true

      return navigateTo("/dashboard")

    },
    async checkAuth() {
      /* await $fetch('http://localhost:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        this.user = res.user
      }).catch(err => {

        this.LoggedIn = false
        this.user = {}
      }) */
    },
    async logout() {

      await $fetch('http://localhost:8000/api/logout', {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then(res => {

        this.LoggedIn = false
        this.user = {}
        this.token = null
        return navigateTo("/")
      })

    }

  },
  persist: {
    storage: localStorage
  }
})