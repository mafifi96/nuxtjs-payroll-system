<template>

    <Head>
        <Title>
            {{ title + ` | Employee` }}
        </Title>
    </Head>
<Loader v-if="loading"></Loader>
<CreateEmployee v-show="openModal" @close="openModal = false"></CreateEmployee>

    <div class="bg-white rounded p-3 text-center">
        <h2 class="text-slate-600 capitalize font-semibold text-xl">employee</h2>
    </div>
    

    <div class="flex px-2 my-2 pb-5">
        <div class="w-full rounded-1 ">
            <div class="w-full flex justify-end items-center my-3 bg-[#fafafa] shadow-md rounded-sm p-3">
                <button @click="openModal = true" class="apperance-none py-1 px-3 bg-indigo-600 text-white capitalize rounded  hover:ring-2 transition-all duration-300"><i class="fa fa-plus"></i> add employee</button>
            </div>

            <div class="w-full bg-[#fafafa] shadow-md rounded-sm p-3">
                <table id="example" class="text-left">
                <thead class="uppercase font-semibold text-sm text-gray-700 bg-zinc-100">
                    <tr>
                        <th style="width:5%">#</th>
                        <th style="width:15%">name</th>
                        <th style="width:15%">email</th>
                        <th style="width:15%">position</th>
                        <th style="width:25%">department</th>
                        <th style="width:15%">joined</th>
                        <th style="width:5%">action</th>
                    </tr>
                </thead>
                <tbody class=" text-xs font-sans font-semibold text-gray-700">
                    <tr v-for="e,index in employees" :key="index">
                        <td  class="font-semibold">{{ index+1 }}</td>
                        <td >{{ e.name }}</td>
                        <td >{{ e.email }}</td>
                        <td >{{ e.position?.name || 'Waiting..' }}</td>
                        <td >{{ e.department?.name }}</td>
                        <td >{{ e.created_at }}</td>
                        <td >
                            <div class="flex w-full h-fit justify-center items-center space-x-1">
                                <button
                                class="hover:text-indigo-600 px-2 py-1 text-sm"
                                @click="edit(e.id)"><i class="fa fa-edit"></i></button> <button
                                class=" hover:text-red-600 px-2 py-1 text-sm transition-colors duration-300"
                                @click="destroy(e.id)"><i class="fa fa-trash-o"></i></button>
                                
                            </div>
                        </td>
                    </tr>
                </tbody>

            </table>
            
            </div>
 
        </div>
    </div>

</template>
 
<script setup>
    
    import { onMounted } from 'vue';
    import  CreateEmployee  from '~~/components/CreateEmployee.vue';
    import Loader from '~~/components/Loader.vue'
    import { useStore } from '~~/store/Store'

    const token = useStore().token
    const openModal = ref(false)

    const { title } = useAppConfig()
    const employees = ref([])
    const loading = ref(false)
    definePageMeta({
        layout: 'dashboard',
        middleware: 'auth'
    })
  
    async function getEmployees()
    {
     
      loading.value = true
      
      await  $fetch("http://127.0.0.1:8000/api/employees", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>{
        employees.value = res.data  
        
    }).catch(err=>{
        console.log("error........")
    }).finally(()=>{

        loading.value = false
    })

    } 

    onMounted(() => {

        getEmployees()
             
    })
</script>

<style scoped>

 th, td {
  border: 1px solid #ddd;
  border-collapse: collapse;
}
th,td{
    padding: 8px 10px;
}

tr:nth-child(even) {
        background-color: rgb(236, 236, 236);
    }

    
</style>