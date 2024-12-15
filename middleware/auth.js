import { useStore } from "~~/store/store"

export default defineNuxtRouteMiddleware((to, from) => {

    
    const {isLoggedIn,checkAuth} = useStore();
    
   // checkAuth();
     /* if (!isLoggedIn) {
        
         return navigateTo('/')

        }else{
            console.log("authenticated")
        }
         */
  })
  