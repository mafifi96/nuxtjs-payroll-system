import { useStore } from "~/store/store"


export default defineNuxtRouteMiddleware((to, from) => {

    const {LoggedIn} = useStore()

    
    if (LoggedIn) {
             return navigateTo('/dashboard')

        }

  })
  