<template>
    <Head>
        <Title>
            {{ title + ` | Attendances` }}
        </Title>
    </Head>


    <PageHeading>attendances</PageHeading>

    <div class="flex px-2 my-2 pb-5">

        <div class="w-full  shadow-md rounded-sm p-3">
            <UTable :loading="status == 'pending'"
                :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                :progress="{ color: 'primary', animation: 'carousel' }" class="w-full" :columns="columns"
                :rows="data?.data"  />
                <UPagination v-if="data?.data.length" v-model="page"  :total="total" />

        </div>

    </div>
</template>

<script setup>
import PageHeading from '~~/components/PageHeading.vue'

import {
    useStore
} from '~~/store/store'
definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})
const {token} = useStore()
const openModal = ref(false)
const { title , api } = useAppConfig()

const columns = [{
    key: 'id',
    label: '#'
}, {
    key: 'employee_name',
    label: 'Employee'
},
{
    key: 'date',
    label: 'Day'
}, {
    key: 'status',
    label: 'Present / Absent'
}, 
{
    key: 'check_in',
    label: 'Check In'
}, 
{
    key: 'check_out',
    label: 'Check Out'
}]

const page = ref(1)


const { status, data, error ,refresh } = await useLazyFetch(`${api}/attendances`, {

headers: {
    'Authorization': `Bearer ${token}`,
    'Content-type': 'application/json'
},
query : {
    page : page
}
})
const total = computed(() => data.value?.pagination.total)


async function updateAttendance(r, s) {

    
    await $fetch(`${api}/attendances/${r}`, {
        method: 'put',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: {
            present: s
        }
    }).then(res => {

        refresh()
    }).catch(err => {

    }).finally(() => {

        //loading.value = false
    })

}

</script>

<style scoped>
th,
td {
    border: 1px solid #ddd;
    border-collapse: collapse;
}

th,
td {
    padding: 8px 10px;
}

tr:nth-child(even) {
    background-color: rgb(236, 236, 236);
}
</style>