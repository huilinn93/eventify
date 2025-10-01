<script setup lang="ts">
useSeoMeta({
  title: 'About Us - Eventify',
  description: 'Learn about Eventify event decoration services'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <UContainer class="py-12">
      <UButton to="/" icon="i-heroicons-arrow-left" variant="ghost" color="gray" class="mb-6">
        Back
      </UButton>
      
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Eventify</h1>
      
      <div class="space-y-6">
        <UCard>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Who We Are</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            We specialize in event decoration services, helping create memorable experiences through thoughtful design and attention to detail.
          </p>
        </UCard>

        <UCard>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">What We Offer</h2>
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li class="flex items-start gap-2">
              <UIcon name="i-heroicons-check-circle" class="text-primary mt-1 shrink-0" />
              <span>Custom reception welcome table decorations</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-heroicons-check-circle" class="text-primary mt-1 shrink-0" />
              <span>Business centerpiece display racks</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-heroicons-check-circle" class="text-primary mt-1 shrink-0" />
              <span>Event gamification solutions (coming soon)</span>
            </li>
          </ul>
        </UCard>

        <UCard>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Why Choose Us</h2>
          <div class="space-y-3 text-gray-600 dark:text-gray-400">
            <p class="flex items-start gap-2">
              <UIcon name="i-heroicons-star" class="text-primary mt-1 shrink-0" />
              <span>Personalized service tailored to your event</span>
            </p>
            <p class="flex items-start gap-2">
              <UIcon name="i-heroicons-star" class="text-primary mt-1 shrink-0" />
              <span>Quality materials and craftsmanship</span>
            </p>
            <p class="flex items-start gap-2">
              <UIcon name="i-heroicons-star" class="text-primary mt-1 shrink-0" />
              <span>Flexible and reliable service</span>
            </p>
          </div>
        </UCard>
      </div>

      <div class="mt-8">
        <UButton to="/contact" size="lg" color="primary" block>
          Contact Us
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
