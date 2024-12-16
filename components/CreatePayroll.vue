<template>
    <div @click.self="$emit('close')"
        class="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-60 z-40">

        <div class="absolute top-5 right-5 z-50">
            <button @click="$emit('close')" id="close"
                class="apperance-none text-base px-3 text-slate-200 cursor-pointer">
                <i class="fa fa-close"></i>
            </button>
        </div>
        <div class=" lg:w-[40%] md:w-[40%] w-[70%] h-[90%]  rounded bg-[#eee] px-2">
            <div class="text-center p-3 text-stone-700 capitalize text-lg font-bold">
                create payroll
            </div>
            <div>
                <form @submit.prevent ref="formInputs">
                    <div class="flex flex-col justify-between items-center p-4 space-y-3">
                        <div v-if="saved"
                            class="text-center w-full p-3 rounded bg-green-300 text-zinc-50 capitalize text-md font-bold">
                            payroll created successfully !
                        </div>
                        <div v-if="errors.show" class="relative w-full">
                            <span @click="errors.show = false" class="absolute top-3 right-3 cursor-pointer "><i
                                    class="fa fa-close"></i></span>
                            <Errors :errors="errors"></Errors>
                        </div>
                        
                        <div class="w-full">
                            <label for="start" class="text-base capitalize ">start date</label>

                            <input type="date" v-model="start_date" id="start"
                                class="w-full p-2 rounded appearance-none ring-inset" placeholder="Start Date">
                        </div>
                        <div class="w-full">
                            <label for="end" class="text-base capitalize">end date</label>
                            <input type="date" v-model="end_date" id="end"
                                class="w-full  p-2 rounded appearance-none ring-inset" placeholder="End Date">
                        </div>

                        <div class="p-3  flex justify-center items-center w-full">
                            <button @click.prevent="create()" :disabled="proccessing"
                                class="bg-blue-500 block w-auto text-white px-6 rounded tracking-wide capitalize py-2 hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 transition-all font-semibold">{{proccessing ? 'storing...' : 'create'}}</button>
                        </div>

                    </div>

                </form>

            </div>

        </div>
    </div>
</template>

<script setup>
    import {
        ref
    } from 'vue'
    import Errors from '~~/components/Errors.vue'

    import {
        useStore
    } from '~~/store/store'

    const {
        token
    } = useStore()

    const start_date = ref('')
    const end_date = ref('')
    const proccessing = ref(false)
    const saved = ref(false)
    const errors = ref({
        show: false
    })

    async function create() {
        proccessing.value = true

        await $fetch("http://127.0.0.1:8000/api/payrolls", {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: {
                from: start_date.value,
                to: end_date.value,

            },
        }).then(res => {
            saved.value = true
            console.log(res)

        }).catch(err => {
            console.log(err.response.message)
            
            errors.value = err.data.message
            errors.value.show = true
        }).finally(() => {
            proccessing.value = false
        })

    }
</script>

<style scoped>
    div>label {
        display: block;
        margin-bottom: .3rem;
        color: #333;
    }
</style>