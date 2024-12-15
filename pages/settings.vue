<template>
    <Head>
        <Title>
            {{ title + ` | Settings` }} 
        </Title>
    </Head>
    
    <div class="bg-white rounded p-3 text-center">
        <h2 class="text-slate-600 capitalize font-semibold text-xl">settings</h2>
    </div>

</template>

<script setup>
import PageHeading from '~~/components/PageHeading.vue'    
const {title} = useAppConfig()


    definePageMeta({
        layout: 'dashboard'
    })
</script>

<style scoped>

</style>