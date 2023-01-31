<template>
    <div class="bg-red-200 p-3 rounded-md mb-3 ">
        <ul>
            <li v-for="error in errors" :key="error" class="text-slate-700">
                {{ error }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['errors']
    }

</script>