<template>
    <div>

        <!-- side bar-->
        <div id="side-bar"
            class="fixed left-0 top-0 bg-gradient-to-b from-indigo-700 via-indigo-600 to-indigo-500 
              h-full  lg:w-72 md:w-72 w-0 overflow-hidden py-1 transition-all duration-200 z-30">
            <div class="logo  px-3 text-left py-2 flex flex-1 items-center justify-between">
                <!-- nav icon -->
                <div>

                <NuxtLink to="/" class="w-11 h-11 text-indigo-300 text-5xl m-2 block hover:ml-3 hover:rotate-2 hover:text-slate-200 transition-all duration-300">
                    <i class="fa fa-modx"></i>
                </NuxtLink>
            </div>
            <!-- close button-->
                <div>
                    <button id="close" class="apperance-none text-base px-3 text-slate-200 cursor-pointer lg:hidden md:hidden block">
                        <i class="fa fa-close"></i>
                    </button>
                </div>
                

            </div>
            <!-- nav menu-->
            <div class="px-2 py-6">
                
                <NuxtLink class="capitalize  block py-1 px-3 mb-1.5 font-semibold lg:text-lg md:text-base text-xs  text-slate-200 hover:text-slate-50  rounded-md hover:bg-indigo-500 transition-all "
                    to="/dashboard">
                    <i class="fa fa-dashboard w-6 h-6 inline-block mr-1.5 -mt-1"></i>
                    <span>dashboard</span></NuxtLink>
                <NuxtLink class="capitalize lg:text-lg md:text-base text-xs block py-1 px-3 mb-1.5 font-semibold text-slate-200 hover:text-slate-50 rounded-md hover:bg-indigo-500 transition-all"
                    to="/attendances">
                    <i class="fa fa-sign-in w-6 h-6 inline-block mr-1.5 -mt-1"></i>
                    <span>attendances</span></NuxtLink>
                <NuxtLink class="capitalize block py-1 px-3 mb-1.5 font-semibold lg:text-lg md:text-base  text-slate-200 hover:text-slate-50 rounded-md hover:bg-indigo-500 transition-all text-xs"
                    to="/employee">
                    <i class="fa fa-user-o w-6 h-6 inline-block mr-1.5 -mt-1"></i>
                    <span>employee</span></NuxtLink>
                <NuxtLink class="capitalize block py-1 px-3 mb-1.5 font-semibold lg:text-lg md:text-base text-xs text-slate-200 hover:text-slate-50 rounded-md hover:bg-indigo-500 transition-all"
                    to="/department">
                    <i class="fa fa-users w-6 h-6 inline-block mr-1.5 -mt-1"></i>
                    <span >departments</span></NuxtLink>
                    <NuxtLink class="capitalize block py-1 px-3 mb-1.5 font-semibold lg:text-lg md:text-base text-xs text-slate-200 hover:text-slate-50 rounded-md hover:bg-indigo-500 transition-all"
                    to="/position">
                    <i class="fa fa-star-o w-6 h-6 inline-block mr-1.5 -mt-1"></i>
                    <span >positions</span></NuxtLink>
                    
                <NuxtLink class="capitalize block py-1 px-3 mb-1.5 font-semibold lg:text-lg md:text-base text-xs text-slate-200 hover:text-slate-50 rounded-md hover:bg-indigo-500 transition-all"
                    to="/payrolls">
                    <i class="fa fa-credit-card w-6 h-6 inline-block mr-1.5 -mt-1"></i>
                    <span >payrolls</span></NuxtLink>
                <NuxtLink class="capitalize block py-1 px-3 mb-1.5 font-semibold lg:text-lg md:text-base text-xs text-slate-200 hover:text-slate-50 rounded-md hover:bg-indigo-500 transition-all"
                    to="/payslips">
                    <i class="fa fa-money w-6 h-6 inline-block mr-1.5 -mt-1"></i>                     
                    <span >payslips</span></NuxtLink>
                <NuxtLink class="capitalize block py-1 px-3 mb-1.5 font-semibold lg:text-lg md:text-base text-xs text-slate-200 hover:text-slate-50 rounded-md hover:bg-indigo-500 transition-all"
                    to="/settings">
                    <i class="fa fa-cogs w-6 h-6 inline-block mr-1.5 -mt-1"></i>
                    <span>settings</span></NuxtLink>
            </div>
        </div>

    <main class="overflow-hidden lg:ml-72 md:ml-72 transition-all duration-200">
        <!-- nav and main content-->
       
            <nav class="py-3 w-full bg-white shadow-md border-b-2 border-b-slate-300">
                <div class="container max-w-[95%] mx-auto px-1 flex flex-1 items-center justify-between">
                   <div>
                    <button id="menu" class="apperance-none mx-2 lg:hidden md:hidden block cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                          </svg>
                          
                    </button>
                   </div>

                    <div class="flex flex-1 items-center justify-start ">
                         
                        
                          <i class="fa fa-search w-7 h-7 before:text-xl text-slate-300 text-opacity-75"></i>

                        <input type="text" class="w-full px-2 py-1 outline-none text-slate-400" name="search" id="search" placeholder="search...">
                    </div>

                    <div>
                        <button id="logout" @click="logout()"  class="appearance-none menu cursor-pointer z-10">
                        <i class="fa fa-sign-out w-6 h-6  text-slate-600 hover:text-red-500 transition-colors before:text-lg"></i>
                    </button>
                </div>
                </div>
        
            </nav>

            <section class="mt-8">
                <div class="container max-w-[95%] mx-auto">
                     <slot/>
                </div>
            </section>
           
    </main>

    </div>
    </template>
<script setup>
import {useStore} from '~~/store/Store'


async function logout()
{
   await useStore().logout()
   
}

</script>

<style scoped>
a.router-link-active {
     --tw-bg-opacity: 1;
    background-color: rgb(55 48 163 / var(--tw-bg-opacity));
     
    
}
</style>