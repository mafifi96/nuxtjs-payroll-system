<template>
<Head>
    <Title>
        {{ title + ` | Departments` }}
    </Title>
</Head>


<PageHeading>departments </PageHeading>
<div class="flex lg:justify-between md:justify-between align-center">
    <div class="w-full lg:w-[40%] md:w-[25%] bg-gray-100 shadow-md rounded rounded-1 mr-2">
        <div class="px-2 py-4 font-md text-slate-500 border-b-2 capitalize">
            <h2>create / edit new department</h2>
        </div>
        <div class="bg-white px-2 py-4">
            <form>
                <input type="text" class="my-2 border w-full p-2 rounded-sm border-zinc-200" v-model="name" placeholder="Name" required>
                <textarea v-model="description" placeholder="Description" class="my-2 border w-full h-16 p-2 rounded-sm border-zinc-200" id="" cols="30" rows="10"></textarea>
            </form>
        </div>
        <div class="px-2 py-4 border-t-2 flex justify-center items-center">
            <button @click="create()" :disabled="proccessing" class="bg-blue-500 block w-auto text-white px-6 rounded tracking-wide capitalize py-2 hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 transition-all font-semibold">{{proccessing ? 'storing...' : 'create'}}</button>

        </div>
    </div>
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
import {
    ref
} from 'vue';

import {
    useStore
} from '~/store/store'
const {
    token
} = useStore()

const {
    title,
    api
} = useAppConfig()

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})

const name = ref('')
const description = ref('')
const proccessing = ref(false)

const columns = [
    {
        key: 'id',
        label: '#',

    },
    {
        key: 'name',
        label: 'Name',

    },
    {
        key: 'employees_count',
        label: 'Employees Count',

    },
    {
        key: 'created_at',
        label: 'Created At',
    },
    {
        key: 'actions',
        label: 'Actions'
    },


]
const page = ref(1)

const {
    status,
    data,
    error,
    refresh
} = await useLazyFetch(`${api}/departments`, {

    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
    },
    query: {
        page: page
    }
})

const total = computed(() => data.value?.pagination.total)

async function create() {
    proccessing.value = true

    await $fetch(`${api}/departments`, {
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
        refresh()

    }).catch(err => {
        //errors component
    }).finally(() => {
        proccessing.value = false
    })

}

async function destroy(id) {
    await $fetch(`${api}/departments/${id}`, {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    }).then(res => {
        refresh()

    }).catch(err => {
        alert(err.message)
    })

}

const edit = (id) => {

    const dep = departments.value.data.find((el) => {
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
