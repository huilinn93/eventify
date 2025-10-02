<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const isOpen = defineModel<boolean>({ default: false })
const authStore = useAuthStore()
const toast = useToast()

const form = reactive({
  username: '',
  password: ''
})

const loading = ref(false)

async function handleLogin() {
  loading.value = true

  try {
    const success = authStore.login(form.username, form.password)

    if (success) {
      toast.add({
        title: 'Login successful',
        description: 'Welcome back!',
        color: 'green'
      })
      isOpen.value = false
      form.username = ''
      form.password = ''

      // Navigate to admin dashboard
      await navigateTo('/admin/dashboard')
    } else {
      toast.add({
        title: 'Login failed',
        description: 'Invalid username or password',
        color: 'red'
      })
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Admin Login
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UFormGroup label="Username" required>
          <UInput
            v-model="form.username"
            placeholder="Enter username"
            icon="i-heroicons-user"
            size="lg"
            required
          />
        </UFormGroup>

        <UFormGroup label="Password" required>
          <UInput
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            icon="i-heroicons-lock-closed"
            size="lg"
            required
          />
        </UFormGroup>

        <div class="pt-2">
          <UButton
            type="submit"
            color="primary"
            size="lg"
            block
            :loading="loading"
          >
            Login
          </UButton>
        </div>
      </form>

      <template #footer>
        <div class="text-sm text-gray-500 dark:text-gray-400 text-center">
          Demo credentials: admin / admin123
        </div>
      </template>
    </UCard>
  </UModal>
</template>
