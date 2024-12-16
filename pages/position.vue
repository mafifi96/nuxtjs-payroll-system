<template>

    <Head>
        <Title>
            {{ title + ` | Departments` }}
        </Title>
    </Head>


    <div class="bg-white rounded p-3 text-center ">
        <h2 class="text-slate-600 capitalize font-semibold text-xl mb-3">positions
        </h2>
    </div>
 
    <div class="flex flex-wrap lg:flex-nowrap md:flex-nowrap lg:justify-between md:justify-between align-center px-2 lg:space-x-3 md:space-x-3">
        <div class="w-full lg:w-[40%] md:w-[25%] h-fit bg-gray-100 shadow-md rounded rounded-1  mb-5">
            <div class="px-[1.2rem] py-[.6rem] font-md text-slate-500 border-b-2 capitalize">
                <h2>create position</h2>
            </div>
            <div class="bg-white px-3 py-4">
                <form>
                     <select class="my-2  w-full p-2 rounded-sm border-zinc-200 border-1 " v-model="department">
                        <option value="" selected>Select Department</option>
                        <option v-for="d in data.data.departments" :key="d.id" :value="d.id" >{{ d.name }}</option>
                    </select>
  
                    <input type="text" class="my-2 border w-full p-2 rounded-sm border-zinc-200" v-model="name"
                        placeholder="Name" required>
                    
                </form>
            </div>
            <div class="p-3 border-t-2 flex justify-center items-center ">
                <button @click="create()" :disabled="proccessing"
                    class="bg-blue-500 block w-auto text-white px-6 rounded tracking-wide capitalize py-2 hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 transition-all font-semibold">{{proccessing ? 'storing...' : 'create'}}</button>

            </div>
        </div>
        <div class="w-full lg:w-[60%] md:w-[75%]  rounded rounded-1">
            <table class=" table-auto w-full bg-slate-50">
                <thead class="text-center capitalize font-semibold">
                    <tr>
                        <td style="width:10%">#</td>
                        <td style="width:40%">position</td>
                        <td style="width:40%">department</td>
                        <td style="width:10%">action</td>
                    </tr>
                </thead>
                  <tbody v-if="data.data.positions.length > 0">
                    <tr v-for="p,index in data.data.positions" :key="index">
                        <td  class="text-center">{{ index+1 }}</td>
                        <td >{{ p.name }}</td>
                        <td >{{ p.department?.name || 'Deleted' }}</td>
                        <td  class="flex justify-center items-center space-x-1"> <button
                                class="hover:text-indigo-600 px-2 py-1 text-sm"
                                @click="edit(p.id)"><i class="fa fa-edit"></i></button> <button
                                class=" hover:text-red-600 px-2 py-1 text-sm transition-colors duration-300"
                                @click="destroy(p.id)"><i class="fa fa-trash-o"></i></button></td>
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
    import PageHeading from '~~/components/PageHeading.vue'    


    import {
        useStore
    } from '~~/store/store'
    const {token} = useStore()

    const {
        title,api
    } = useAppConfig()

    definePageMeta({
        layout: 'dashboard',
        middleware: 'auth'
    })

    const name = ref('')
    const department = ref('')
    const proccessing = ref(false)

        const {data : data , refresh} = await useFetch(`${api}/positions` , {
           
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }) 
   

    async function create() {
        proccessing.value = true

        await $fetch(`${api}/positions`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
                
            },
            body: {

                name: name.value,
                department: department.value
            },
        }).then(res => {
            name.value = ''
            department.value = ''
            refresh()
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            proccessing.value = false
        })

    }


    async function destroy(id) {
        await $fetch(`${api}/positions/${id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        }).then(res => {
            alert("deleted")
            refresh()
        }).catch(err => {
            alert(err.message)
        })

    }
/* 
    function edit(id) {

        const dep = data.data.positions.find((el) => {
            return el.id == id
        })

        name.value = dep.name
    } */
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