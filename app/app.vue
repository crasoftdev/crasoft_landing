<template>
  <UApp :toaster="toaster">
    <NuxtLoadingIndicator />
    <NuxtLayout />
  </UApp>
</template>
<script setup>
const toaster = { position: 'top-center', duration: 2500, progress: false, expand: true, max: 3 }
</script>
