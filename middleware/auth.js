import { useAuth } from "~/store/Auth"

export default defineNuxtRouteMiddleware((to, from) => {

    const auth = useAuth()

     if (auth.isLoggedIn) {
        
         return navigateTo('/dashboard')

        }
        
     
  })
  