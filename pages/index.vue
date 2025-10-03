<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const showLoginModal = ref(false)

onMounted(() => {
  authStore.checkAuth()
})

useSeoMeta({
  title: 'Eventify - Event Management Made Simple',
  description: 'Professional event management services for your special occasions'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <UContainer class="py-20">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Eventify
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Transform your events into unforgettable experiences
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <UButton
            to="/services"
            size="xl"
            color="teal"
            variant="solid"
            block
            class="h-24"
          >
            <div class="flex flex-col items-center gap-2">
              <UIcon name="i-heroicons-sparkles" class="text-2xl" />
              <span class="text-lg font-semibold">Our Services</span>
            </div>
          </UButton>

          <UButton
            to="/contact"
            size="xl"
            color="amber"
            variant="solid"
            block
            class="h-24"
          >
            <div class="flex flex-col items-center gap-2">
              <UIcon name="i-heroicons-envelope" class="text-2xl" />
              <span class="text-lg font-semibold">Contact Us</span>
            </div>
          </UButton>
          
          <UButton
            to="/about"
            size="xl"
            color="primary"
            variant="solid"
            block
            class="h-24"
          >
            <div class="flex flex-col items-center gap-2">
              <UIcon name="i-heroicons-information-circle" class="text-2xl" />
              <span class="text-lg font-semibold">About Us</span>
            </div>
          </UButton>

          <UButton
            size="xl"
            color="gray"
            variant="outline"
            block
            class="h-24"
            @click="showLoginModal = true"
          >
            <div class="flex flex-col items-center gap-2">
              <UIcon name="i-heroicons-lock-closed" class="text-2xl" />
              <span class="text-lg font-semibold">Admin Login</span>
            </div>
          </UButton>
        </div>
      </div>
    </UContainer>

    <LoginModal v-model="showLoginModal" />
  </div>
</template>
