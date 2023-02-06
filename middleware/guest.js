import { useStore } from "~~/store/Store"

export default defineNuxtRouteMiddleware((to, from) => {

    const auth = useStore()

     if (auth.isLoggedIn) {
        
         return navigateTo('/dashboard')

        }
     
  })
  