import { defineStore } from "pinia";
const {api} = useAppConfig()
export const useStore = defineStore("auth", {
  state: () => ({
    user: {},
    LoggedIn: false,
    token: null,
  }),
  getters: {
    authUser() {
      return this.user;
    },
    isLoggedIn() {
      return this.LoggedIn;
    },
  },
  actions: {
    async signIn(token) {
      this.token = token;

      const user = await $fetch(`${api}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      this.user = user;
      this.LoggedIn = true;

      return navigateTo("/dashboard");
    },
    async checkAuth() {
      const { error  } = await useFetch(`${api}/user`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept : 'application/json'
        },
        credentials: "include",
      });

       if (error) {
        if(error?.value.statusCode == 401)
        {
          this.user = {};
          this.token = null;
          this.LoggedIn = false;
          return navigateTo("/");
        }
        
      } 
    },
    async logout() {
      await $fetch(`${api}/logout`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept : 'application/json'
        },
      }).finally(()=>{
        this.LoggedIn = false;
        this.user = {};
        this.token = null;
        return navigateTo("/");

      })
        
    },
  },
  persist: true,
});
