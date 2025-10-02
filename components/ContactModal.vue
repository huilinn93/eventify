<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false })
const toast = useToast()

interface FormData {
  name: string
  email: string
  number: string
  inquiry: string
  otherInfo: string
}

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)

const formData = ref<FormData>({
  name: '',
  email: '',
  number: '',
  inquiry: '',
  otherInfo: '',
})

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    number: '',
    inquiry: '',
    otherInfo: '',
  }
  submitError.value = null
}

const handleSubmit = async () => {
  isSubmitting.value = true
  submitError.value = null

  try {
    await $fetch('/api/sheets', {
      method: 'POST',
      body: formData.value,
    })

    toast.add({
      title: 'Success!',
      description: "Thank you for contacting us! We'll get back to you within 24 hours.",
      color: 'green'
    })

    resetForm()
    isOpen.value = false
  } catch (err) {
    submitError.value = 'Failed to submit your inquiry. Please try again or contact us directly.'
    console.error('Submit error:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UModal v-model="isOpen" :ui="{ width: 'max-w-2xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
              Contact Us
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Have a question or ready to plan your event? We'd love to hear from you!
            </p>
          </div>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <UFormGroup label="Full Name" required>
          <UInput
            v-model="formData.name"
            placeholder="John Doe"
            size="lg"
            icon="i-heroicons-user"
            required
          />
        </UFormGroup>

        <UFormGroup label="Email Address" required>
          <UInput
            v-model="formData.email"
            type="email"
            placeholder="john@example.com"
            size="lg"
            icon="i-heroicons-envelope"
            required
          />
        </UFormGroup>

        <UFormGroup label="Phone Number" required>
          <UInput
            v-model="formData.number"
            placeholder="+1 (555) 123-4567"
            size="lg"
            icon="i-heroicons-phone"
            required
          />
        </UFormGroup>

        <UFormGroup label="Event Details" required>
          <UTextarea
            v-model="formData.inquiry"
            placeholder="Tell us about your event - type, date, location, and what you need..."
            :rows="4"
            size="lg"
            required
          />
        </UFormGroup>

        <UFormGroup label="Additional Information">
          <UTextarea
            v-model="formData.otherInfo"
            placeholder="Any other details you'd like to share (budget, special requests, etc.)"
            :rows="3"
            size="lg"
          />
        </UFormGroup>

        <UAlert
          v-if="submitError"
          icon="i-heroicons-exclamation-triangle"
          color="red"
          variant="soft"
          :description="submitError"
        />

        <div class="flex justify-end gap-3">
          <UButton
            type="button"
            color="gray"
            variant="ghost"
            @click="isOpen = false"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            size="lg"
            color="primary"
            :loading="isSubmitting"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Sending...' : 'Submit Inquiry' }}
          </UButton>
        </div>
      </form>

      <template #footer>
        <div class="text-center text-sm text-gray-600 dark:text-gray-400">
          <p class="mb-2">You can also reach us directly:</p>
          <div class="flex flex-col gap-1">
            <a href="mailto:hello@eventify.com" class="hover:text-primary transition-colors">
              <UIcon name="i-heroicons-envelope" class="inline" /> hello@eventify.com
            </a>
            <a href="tel:+15551234567" class="hover:text-primary transition-colors">
              <UIcon name="i-heroicons-phone" class="inline" /> +1 (555) 123-4567
            </a>
          </div>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
