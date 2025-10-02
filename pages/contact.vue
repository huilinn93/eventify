<script setup lang="ts">
useSeoMeta({
  title: 'Contact Us - Eventify',
  description: 'Get in touch with Eventify for your event planning needs'
})

interface FormData {
  name: string
  email: string
  number: string
  inquiry: string
  otherInfo: string
}

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitSuccess = ref(false)

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
  submitSuccess.value = false

  try {
    await $fetch('/api/sheets', {
      method: 'POST',
      body: formData.value,
    })

    submitSuccess.value = true
    resetForm()

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (err) {
    submitError.value = 'Failed to submit your inquiry. Please try again or contact us directly.'
    console.error('Submit error:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <UContainer class="py-12">
      <div class="mb-12">
        <UButton to="/" icon="i-heroicons-arrow-left" variant="ghost" color="gray" class="mb-6">
          Back to Home
        </UButton>
        <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Have a question or ready for glam-up or game-up? We'd love to hear from you!
        </p>
      </div>

      <div class="max-w-2xl mx-auto">
        <UAlert
          v-if="submitSuccess"
          icon="i-heroicons-check-circle"
          color="green"
          variant="soft"
          title="Success!"
          description="Thank you for contacting us! We'll get back to you within 24 hours."
          class="mb-6"
        />

        <UCard>
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
              class="mb-4"
            />

            <div class="flex justify-end">
              <UButton 
                type="submit" 
                size="xl"
                :loading="isSubmitting"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Sending...' : 'Submit Inquiry' }}
              </UButton>
            </div>
          </form>
        </UCard>

        <div class="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p class="mb-2">You can also reach us directly:</p>
          <div class="flex flex-col gap-2">
            <a href="mailto:hello@eventify.com" class="hover:text-primary transition-colors">
              <UIcon name="i-heroicons-envelope" class="inline" /> hello@eventify.com
            </a>
            <a href="tel:+15551234567" class="hover:text-primary transition-colors">
              <UIcon name="i-heroicons-phone" class="inline" /> +1 (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
