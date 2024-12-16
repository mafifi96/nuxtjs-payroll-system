<template>
    <div @click.self="$emit('close')" class="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-60 z-40">

        <div class="absolute top-5 right-5 z-50">
            <button @click="$emit('close')" id="close"
                class="apperance-none text-base px-3 text-slate-200 cursor-pointer">
                <i class="fa fa-close"></i>
            </button>
        </div>

        <div class=" w-[30%] rounded bg-[#eee] px-2">
            <div class="text-center p-3 text-stone-700 capitalize text-lg font-bold">
                add new employee
            </div>
            

            <div>
                <form @submit.prevent>
                    <div class="flex flex-col justify-between items-center p-4 space-y-3">
                        <div v-if="saved" class="text-center w-full p-3 rounded bg-green-300 text-zinc-50 capitalize text-md font-bold">
                Employee Added Successfully
            </div>
            <div v-if="errors.show" class="relative">
                        <span @click="errors.show = false" class="absolute top-3 right-3 cursor-pointer "><i class="fa fa-close"></i></span>
                        <Errors :errors="errors"></Errors>
                        
                    </div>
                    
                        <div class="w-full">
                            <input type="text" v-model="name" class="p-2 w-full rounded appearance-none ring-inset"
                                placeholder="Name">
                        </div>
                        <div class="w-full">
                            <input type="email" v-model="email" class="p-2 w-full rounded appearance-none ring-inset"
                                placeholder="Email">
                        </div>
                        <div class="w-full">
                            <input type="number" v-model="phone" class="p-2 w-full rounded appearance-none ring-inset"
                                placeholder="Phone">
                        </div>
                        <div class="w-full flex justify-start items-center space-x-4 text-base">
                            <label for="working">Working

                                <input class="ml-1" type="radio" id="working" v-model="status" value="1">
                            </label>

                            <label for="working">Holding

                                <input class="ml-1" type="radio" id="notworking" v-model="status" value="0">
                            </label>

                        </div>
                        <div class="w-full">
                            <select class="my-2  w-full p-2 rounded-sm shadow-md" v-model="department">
                                <option value="" selected>Select Department</option>
                                <option v-for="d in departments.data" :key="d.id" :value="d.id">{{ d.name }}</option>
                            </select>

                        </div>
                        <div class="w-full">
                            <select :disabled="positions.data?.length == 0 || positions.length == 0"
                                class="my-2  w-full p-2 rounded-sm shadow-md " v-model="position">
                                <option value="" selected>Select Position</option>
                                <option v-for="p in positions.data" :key="p.id" :value="p.id">{{ p.name }}</option>
                            </select>
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

    
    const {token} = useStore()
    const name = ref('')
    const email = ref('')
    const phone = ref('')
    const status = ref(0)
    const department = ref('')
    const position = ref('')
    const proccessing = ref(false)
    const saved = ref(false)
    const positions = ref([])
    const errors = ref({show : false})

    const { data: departments } = await useAsyncData(
        'departments',
        () => $fetch("http://127.0.0.1:8000/api/departments", {
            headers: {
                'Authorization': `Bearer ${token}`
            },

        }))


    watch(() => department.value, async () => {

        if (department.value == '') {
            positions.value.data = []
            return
        }
        positions.value = await useAsyncData('positions', () => $fetch(
            `http://127.0.0.1:8000/api/departments/${department.value}/positions`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }))

    })

    async function updatee() {
        proccessing.value = true

        await $fetch("http://127.0.0.1:8000/api/employees", {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: {
                name: name.value,
                email: email.value,
                phone: phone.value,
                status: status.value,
                department_id: department.value,
                position_id: position.value,
                _method : 'PATCH'
            },
        }).then(res => {
            saved.value = true
            
        }).catch(err => {
            errors.value = err.data.message
            errors.value.show = true
            
        }).finally(() => {
            proccessing.value = false
        })

    }

</script>

<style scoped>

</style>