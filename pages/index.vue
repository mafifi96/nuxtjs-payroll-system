<template>

    <Head>
        <Title>
            {{ title + ` | Login` }}
        </Title>
    </Head>

    <div>
        <div class="flex bg-stone-50 rounded w-screen h-screen justify-center items-center">

            <div class="container flex flex-1 p-4  items-center justify-center">


                <div class="rounded w-96 h-auto bg-white shadow-xl border-2 border-gray-100 px-5 py-8">
                    <h1 class="text-center capitalize tracking-wide text-lg font-semibold">welcome {{ user.name }}</h1>

                    <h1 class="text-center capitalize tracking-wide text-lg font-semibold">login to your account</h1>

                    <div class="my-3 p-2 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor"
                            class="w-16 h-16 antialiased hover:subpixel-antialiased stroke-indigo-500">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div v-if="errors.length > 0" class="relative">
                        <span @click="errors = []" class="absolute top-3 right-3 cursor-pointer "><i class="fa fa-close"></i></span>
                        <Errors :errors="errors"></Errors>
                    </div>
                    <form @submit.prevent="login()">
                        <div class="flex flex-1 flex-col space-y-6">
                            <div class="">
                                <label class="block capitalize mb-1 text-slate-700" for="email">email</label>
                                <input v-model="email"
                                    class="w-full px-2 py-1 rounded border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                    type="email" name="email" id="email" required>
                            </div>
                            <div class="">
                                <label class="block capitalize mb-1 text-stone-700" for="password">password</label>
                                <input v-model="password"
                                    class="w-full px-2 py-1 rounded border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                    type="password" name="password" id="password" required>
                            </div>
                            <div class="text-center">
                                <button type="submit" :disabled="proccessing"
                                    class="bg-blue-500 block w-full text-white px-6 rounded tracking-wide capitalize py-2 hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 transition-all font-semibold">{{proccessing ? 'login...' : 'login'}}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        useStore
    } from '~~/store/Store'

    definePageMeta({
        layout: 'default',
        middleware : ['guest']
    })
    
    import Errors from '~~/components/Errors.vue'
    
    export default {
        
        data() {
            return {
                title: useAppConfig().title,
                user: useStore().user,
                email: '',
                password: '',
                errors : [],
                proccessing : false
            }
        },
        methods: {

            async login() {
                this.proccessing = true
                
                    await $fetch('http://127.0.0.1:8000/sanctum/csrf-cookie')
                    
                    await $fetch("http://127.0.0.1:8000/api/login", {
                        method: "post",
                        body: {
                            email: this.email,
                            password: this.password
                        }
                    }).
                    then(res => {
                        
                        useStore().signIn(res.data.token)

                    }).catch(err => {
                        
                        this.errors.push(err.data.message)
                    }).finally(()=>{
                        this.proccessing = false
                    })

            }
        }
    }

</script>

<style scoped>

</style>