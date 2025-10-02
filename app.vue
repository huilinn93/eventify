
<script setup lang="ts">
import { ref } from 'vue'
import LoginModal from '~/components/LoginModal.vue'
const showLoginModal = ref(false)
</script>

<template>
  <NuxtLayout @show-admin-login="showLoginModal=true">
    <NuxtPage />
    <LoginModal v-model="showLoginModal" />
  </NuxtLayout>
</template>
