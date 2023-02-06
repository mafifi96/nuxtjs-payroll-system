<template>

    <Head>
        <Title>
            {{ title + ` | Departments` }}
        </Title>
    </Head>

<Loader v-if="pending" />
    <div class="bg-white rounded p-3 text-center ">
        <h2 class="text-slate-600 capitalize font-semibold text-xl mb-3">departments
        </h2>
    </div>
    
    <div class="flex lg:justify-between md:justify-between align-center">
        <div class="w-full lg:w-[40%] md:w-[25%] bg-gray-100 shadow-md rounded rounded-1 mr-2">
            <div class="px-2 py-4 font-md text-slate-500 border-b-2 capitalize">
                <h2>create / edit new department</h2>
            </div>
            <div class="bg-white px-2 py-4">
                <form>
                    <input type="text" class="my-2 border w-full p-2 rounded-sm border-zinc-200" v-model="name"
                        placeholder="Name" required>
                    <textarea v-model="description" placeholder="Description"
                        class="my-2 border w-full h-16 p-2 rounded-sm border-zinc-200" id="" cols="30"
                        rows="10"></textarea>
                </form>
            </div>
            <div class="px-2 py-4 border-t-2 flex justify-center items-center">
                <button @click="create()" :disabled="proccessing"
                    class="bg-blue-500 block w-auto text-white px-6 rounded tracking-wide capitalize py-2 hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 transition-all font-semibold">{{proccessing ? 'storing...' : 'create'}}</button>

            </div>
        </div>
        <div class="w-full lg:w-[60%] md:w-[75%] shadow-md rounded rounded-1 ml-2">
            <table class=" table-auto w-full bg-slate-50">
                <thead class="text-center capitalize font-semibold">
                    <tr>
                        <td colspan="1">#</td>
                        <td colspan="2">department</td>
                        <td colspan="1">action</td>
                    </tr>
                </thead>
                <tbody class="text-sm">
                    <tr v-for="d in departments.data" :key="d.id">
                        <td colspan="1" class="text-center">{{ d.id }}</td>
                        <td colspan="2">{{ d.name }}</td>
                        <td colspan="1" class="flex justify-center items-center space-x-1"> <button
                                class="hover:text-indigo-600 px-2 py-1 "
                                @click="edit(d.id)"><i class="fa fa-edit"></i></button> <button
                                class=" hover:text-red-600 px-2 py-1  transition-colors duration-300"
                                @click="destroy(d.id)"><i class="fa fa-trash-o"></i></button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script setup>

    import {
        ref
    } from 'vue';
    import Loader from '~~/components/Loader.vue'

    import {
        useStore
    } from '~/store/Store'
    const token = useStore().token

    const {
        title
    } = useAppConfig()

    definePageMeta({
        layout: 'dashboard',
        middleware: 'auth'
    })

    const name = ref('')
    const description = ref('')
    const proccessing = ref(false)


     const { data: departments , pending} = await useAsyncData(
        'departments',
        () => $fetch("http://127.0.0.1:8000/api/departments", {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                
            }
        ))

 
    async function create() {
        proccessing.value = true

        await $fetch("http://127.0.0.1:8000/api/departments", {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: {

                name: name.value,
                description: description.value
            }
        }).then(res => {
            name.value = ''
            description.value = ''
            refreshNuxtData('departments')

        }).catch(err => {
            //errors component
        }).finally(() => {
            proccessing.value = false
        })

    }


    async function destroy(id) {
        await $fetch("http://127.0.0.1:8000/api/departments/" + id, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            alert("deleted")
            
            refreshNuxtData('departments')
            
        }).catch(err => {
            alert(err.message)
        })

    }

    function edit(id) {

        const dep = departments.find((el) => {
            return el.id == id
        })

        name.value = dep.name
    }
</script>

<style scoped>

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    td,
    th {
        padding: 10px 5px;
        border-bottom: 1px solid #ddd;
    }
</style>