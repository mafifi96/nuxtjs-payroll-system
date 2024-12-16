<template>
    <div class="bg-red-200 p-3 rounded-md mb-3 px-3  ">

        <ul  class="list-disc list-inside">
            
            <template v-for="(error,k) in errors " :key="k">
                <li class="px-1 text-slate-700">
                {{ error }}
            </li>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['errors']
    }

</script>