<template>
    <Head>
        <Title>
            {{ title + ` | Dashboard` }} 
        </Title>
    </Head>
    
    <div class="bg-white rounded p-3 text-center">
        <h2 class="text-slate-600 capitalize font-semibold text-xl">Welcome {{ user.name ?? "any" }}</h2>
    </div>

</template>

<script setup>
import { useStore } from '~~/store/store'
const {user} = useStore()
const {title} = useAppConfig()

    definePageMeta({
        layout: 'dashboard',
        middleware : 'auth'
    })
</script>

<style scoped>

</style>