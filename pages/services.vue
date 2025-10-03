<script setup lang="ts">
const showCalculator = ref(false)

useSeoMeta({
  title: 'Eventify',
  description: 'Event decoration and gamification services'
})

const services = [
  {
    icon: 'i-heroicons-light-bulb',
    title: 'Brainstorm Session',
    description: 'Free consultation to brainstorm creative event ideas with our experts.',
    free: true
  },
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
    title: 'Gamification',
    description: 'Coming soon - Interactive games and activities to engage your guests.'
  },
]

const demoImages = [
  { id: 1, src: 'https://picsum.photos/id/237/800/600', alt: 'Event decoration example 1' },
  { id: 2, src: 'https://picsum.photos/id/200/800/600', alt: 'Event decoration example 2' },
  { id: 3, src: 'https://picsum.photos/id/219/800/600', alt: 'Event decoration example 3' },
  { id: 4, src: 'https://picsum.photos/id/292/800/600', alt: 'Event decoration example 4' },
  { id: 5, src: 'https://picsum.photos/id/180/800/600', alt: 'Event decoration example 5' },
  { id: 6, src: 'https://picsum.photos/id/201/800/600', alt: 'Event decoration example 6' },
]
</script>

<template>
  <div>
    <UContainer class="py-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h1>

      <div class="grid gap-6">
        <UCard v-for="service in services" :key="service.title">
          <div class="flex gap-4">
            <div class="shrink-0">
              <div class="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <UIcon :name="service.icon" class="text-2xl text-primary" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                {{ service.title }}
                <span v-if="service.free" class="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded font-medium">Free</span>
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ service.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Price Calculator Button -->
      <div class="mt-8">
        <UCard>
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <UIcon name="i-heroicons-calculator" class="text-3xl text-primary" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  Calculate Your Price
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Get an instant estimate based on guests and duration
                </p>
              </div>
            </div>
            <UButton
              size="lg"
              color="primary"
              @click="showCalculator = true"
              class="w-full md:w-auto"
            >
              Hit Me!
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Demo Images Carousel -->
      <div class="mt-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Gallery</h2>
        <UCarousel
          v-slot="{ item }"
          :items="demoImages"
          :ui="{
            item: 'basis-full md:basis-1/2 lg:basis-1/3',
            container: 'gap-4'
          }"
          class="rounded-lg overflow-hidden"
          arrows
        >
          <div class="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
            <img
              :src="item.src"
              :alt="item.alt"
              class="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
            />
          </div>
        </UCarousel>
      </div>
    </UContainer>

    <PriceCalculator v-model="showCalculator" />
  </div>
</template>
