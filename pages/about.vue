<script setup lang="ts">
const showCalculator = ref(false)

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
            We are people who love to plan as much as attend events.

            We are like baby magpies, finding ourselves drawn to the pretty centerpieces and decorations at events, while struggling to find prolonged entertainment in the midst of all the beauty.

            That's why we want to help YOU throw a beautiful and fun event, that could leave your guests walking away with a smile on their face and a sparkle in their eye - let's just call it... Eventifed.
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
              <span>Event gamifications (coming soon)</span>
            </li>
          </ul>
        </UCard>

        <UCard>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Why Choose Us</h2>
          <div class="space-y-3 text-gray-600 dark:text-gray-400">
            <p class="flex items-start gap-2">
              <UIcon name="i-heroicons-star" class="text-primary mt-1 shrink-0" />
              <span>There is no event too big or small, too simple or extravagant. From an intimate ROM to mall product launches, we enjoy eventifying it all.</span>
            </p>
            <p class="flex items-start gap-2">
              <UIcon name="i-heroicons-star" class="text-primary mt-1 shrink-0" />
              <span>We listen - You have ideas? We execute. You have NO ideas? WE STILL EXECUTE. (We mean upon agreement, of course.)</span>
            </p>
            <p class="flex items-start gap-2">
              <UIcon name="i-heroicons-star" class="text-primary mt-1 shrink-0" />
              <span>WE ARE TRANSPARENT. No "GET A QUOTE". Check out our <button @click="showCalculator = true" class="text-primary hover:underline font-medium">price calculator</button>. But of course, it'd still be <NuxtLink to="/contact?from=about" class="text-primary hover:underline font-medium">nice to chat</NuxtLink>.</span>
            </p>
          </div>
        </UCard>
      </div>

      <div class="mt-8">
        <UButton to="/contact?from=about" size="lg" color="primary" block>
          Contact Us
        </UButton>
      </div>
    </UContainer>

    <PriceCalculator v-model="showCalculator" />
  </div>
</template>
