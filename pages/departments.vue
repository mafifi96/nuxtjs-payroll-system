<template>
    <Head>
        <Title>
            {{ title + ` | Departments` }}
        </Title>
    </Head>

    <PageHeading>departments </PageHeading>
    <div class="flex px-2 my-2 pb-5">
        <div class="w-full rounded-1 ">
            <div class="w-full flex justify-end items-center my-3  rounded-sm p-3">

                <UButton icon="i-heroicons-plus" size="sm" color="primary" variant="solid" label="Create Department"
                    :trailing="false" :loading="processing" @click="isOpen = true" />
            </div>

            <div class="w-full shadow-md rounded-sm p-3">
                <UTable :loading="status == 'pending'"
                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                    :progress="{ color: 'primary', animation: 'carousel' }" class="w-full" :columns="columns"
                    :rows="data?.data">
                    <template #actions-data="{ row }">
                        <UDropdown :items="items(row)">
                            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                        </UDropdown>
                    </template>
                </UTable>
                <UPagination v-if="data?.data.length" v-model="page" :total="total" />
            </div>

        </div>
    </div>

    <UModal v-model="isOpen" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Create Department
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>
            </template>
            <form @submit.prevent>
                <input type="text" :class="{'border-red-600' : nameError}" class="my-2 border w-full p-2 rounded-sm border-zinc-200" v-model="name"
                    placeholder="Name" required>

                <textarea :class="{'border-red-600' : descriptionError}"  v-model="description" placeholder="Description"
                    class="my-2 border w-full h-16 p-2 rounded-sm border-zinc-200" id="" cols="30" rows="10"></textarea>
            </form>

            <template #footer>
                <UButton @click="create()" :disabled="processing" :loading="processing">Create</UButton>
            </template>
        </UCard>
    </UModal>
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

const toast = useToast()
const name = ref('')
const description = ref('')
const processing = ref(false)
const isOpen = ref(false)
const nameError = ref(false)
const descriptionError = ref(false)
const columns = [
    {
        key: 'id',
        label: 'ID',

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

const items = row => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id)
    }], [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => destroy(row.id)
    }]
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

    processing.value = true

    const {error,data,refresh} = await useFetch(`${api}/departments`, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: {
            name: name.value,
            description: description.value
        }
    })

    processing.value = false

    if(!error)
    {
        name.value = ''
        description.value = ''
        refresh()
        toast.add({ title: 'Department Created Successfully!' })
    }else{
        nameError.value = true
        descriptionError.value = true
        toast.add({ title: 'Faieled To Create Department',description : error?.value.data.message.name[0] || error?.value.data.message.description[0] , icon : 'i-heroicons-exclamation-triangle',color:'red'})
    }
    
   

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
