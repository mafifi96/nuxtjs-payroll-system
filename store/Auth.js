import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    user: {},
    LoggedIn : false,    
    token : null
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
      
      const user = await $fetch('http://127.0.0.1:8000/api/user' , {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      this.user = user
      this.LoggedIn = true
      this.token = token
    },
    async checkAuth(){
      await $fetch('http://localhost:8000/api/user' , {
        headers : {
          'Access-Control-Allow-Origin' : '*'
        }
      }).then(res =>{
        this.user = res.user
      }).catch(err =>{
        
        this.LoggedIn = false
        this.user = {}
      })
    },
    async logout() {

      await $fetch('http://localhost:8000/api/logout' , {
        method : 'post',
        headers : {
          'Authorization' : `Bearer ${this.token}`
        }
      }).then(res =>{

      this.LoggedIn = false
      this.user = {}
      this.token = null

      })

    }
    
  },
  persist : {
    storage : sessionStorage
  }
})

