<script setup lang="ts">
useSeoMeta({
  title: 'Our Services - Eventify',
  description: 'Event decoration and gamification services'
})

const services = [
  {
    icon: 'i-heroicons-gift',
    title: 'Reception Welcome Table',
    description: 'Beautiful decorations for your reception welcome table to create a lasting first impression.'
  },
  {
    icon: 'i-heroicons-building-storefront',
    title: 'Business Centerpiece Display',
    description: 'Eye-catching centerpiece display racks for businesses and corporate events.'
  },
  {
    icon: 'i-heroicons-puzzle-piece',
    title: 'Event Gamification',
    description: 'Coming soon - Interactive games and activities to engage your guests.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <UContainer class="py-12">
      <UButton to="/" icon="i-heroicons-arrow-left" variant="ghost" color="gray" class="mb-6">
        Back
      </UButton>
      
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Event decoration services
      </p>

      <div class="grid gap-6">
        <UCard v-for="service in services" :key="service.title">
          <div class="flex gap-4">
            <div class="shrink-0">
              <div class="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <UIcon :name="service.icon" class="text-2xl text-primary" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {{ service.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ service.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <div class="mt-8">
        <UButton to="/contact" size="lg" color="primary" block>
          Get a Quote
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
