<template>
    <Head>
        <Title>
            {{ title + ` | Employee` }}
        </Title>
    </Head>

    <!--  <create-employee v-show="openModalCreate" @close="openModalCreate = false" />
    <edit-employee v-show="openModalEdit" @close="openModalEdit = false" :employee="id" :departments="departments" /> -->

    <PageHeading>employees </PageHeading>
    <div class="flex px-2 my-2 pb-5">
        <div class="w-full rounded-1 ">
            <div class="w-full flex justify-end items-center my-3  rounded-sm p-3">
                <button @click="openModalCreate = true"
                    class="apperance-none py-1 px-3 bg-indigo-600 text-white capitalize rounded  hover:ring-2 transition-all duration-300"><i
                        class="fa fa-plus"></i> add employee</button>
            </div>

            <div class="w-full shadow-lg rounded-sm p-3">
                <UTable :loading="status == 'pending'"
                    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
                    :progress="{ color: 'primary', animation: 'carousel' }" class="w-full" :columns="columns"
                    :rows="data?.data">

                </UTable>
                <UPagination v-if="data?.data.length" v-model="page"  :total="total" />

              
            </div>

        </div>
    </div>
</template>

<script setup>

import CreateEmployee from '~~/components/CreateEmployee.vue';
import EditEmployee from '~~/components/EditEmployee.vue';

import {
    useStore
} from '~~/store/store'

import PageHeading from '~~/components/PageHeading.vue'

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})

const { token } = useStore()
const openModalCreate = ref(false)
const openModalEdit = ref(false)
const id = ref(null);

const {
    title, api
} = useAppConfig()

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
        key: 'email',
        label: 'Email',

    },
    {
        key: 'position',
        label: 'Position',

    },
    {
        key: 'department',
        label: 'Department',

    },
    {
        key: 'joined_at',
        label: 'Joined At',
    },
    {
        key: 'actions',
        label: 'Actions'
    },


]

const page = ref(1)

const { status, data, error  } = await useLazyFetch(`${api}/employees`, {

    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
    },
    query : {
        page : page
    }
})

const total = computed(() => data.value?.pagination.total)

function edit(_id) {

    id.value = parseInt(_id)

    openModalEdit.value = true

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