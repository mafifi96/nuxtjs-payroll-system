<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>

export default{

  beforeCreate()
  {
    console.log("create..")
    //useAuth().getUser()
  }
}
</script>
