<template>

    <Head>
        <Title>
            {{ title + ` | Payrolls` }}
        </Title>
    </Head>
  
<PageHeading>payrolls</PageHeading>
    
    <div class="flex px-2 my-2 pb-5">
     
            <div class="w-full shadow-md rounded-sm p-3">
                <UTable :loading="status == 'pending'"
                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                    :progress="{ color: 'primary', animation: 'carousel' }" class="w-full" :columns="columns"
                    :rows="data?.data">

                </UTable>
                <UPagination v-if="data?.data.length" v-model="page"  :total="total" />

            </div>
    </div>

</template>

<script setup>
       
    import { useStore } from '~~/store/store'
    import PageHeading from '~~/components/PageHeading.vue'    

    const {token} = useStore()
    const { title,api } = useAppConfig()
    const openModal = ref(false)
   
    definePageMeta({
        layout: 'dashboard',
        middleware: 'auth'
    })
      
 
const page = ref(1)

const { status, data, error  } = await useLazyFetch(`${api}/payrolls`, {

    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
    },
    query : {
        page : page
    }
})
const total = computed(() => data.value?.pagination.total)

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