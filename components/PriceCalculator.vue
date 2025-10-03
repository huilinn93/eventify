<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false })

const guests = ref(50)
const duration = ref(4)
const selectedServices = ref<string[]>([])

const services = [
  {
    id: 'brainstorm',
    name: 'Brainstorm Session',
    basePrice: 0,
    icon: 'i-heroicons-light-bulb'
  },
  {
    id: 'welcome',
    name: 'Reception Welcome Table',
    basePrice: 200,
    icon: 'i-heroicons-gift'
  },
  {
    id: 'centerpiece',
    name: 'Business Centerpiece Display',
    basePrice: 350,
    icon: 'i-heroicons-building-storefront'
  },
  {
    id: 'gamification',
    name: 'Event Gamification',
    basePrice: 500,
    icon: 'i-heroicons-puzzle-piece'
  }
]

const pricePerGuest = 5 // $5 per guest
const pricePerHour = 50 // $50 per hour

const selectedServicesTotal = computed(() => {
  return selectedServices.value.reduce((total, serviceId) => {
    const service = services.find(s => s.id === serviceId)
    return total + (service?.basePrice || 0)
  }, 0)
})

const guestCost = computed(() => {
  // Only apply guest cost if guests > 50
  return guests.value > 50 ? (guests.value - 50) * pricePerGuest : 0
})

const durationCost = computed(() => {
  // Only apply duration cost if duration > 4 hours
  return duration.value > 4 ? (duration.value - 4) * pricePerHour : 0
})

const totalPrice = computed(() => {
  return selectedServicesTotal.value + guestCost.value + durationCost.value
})

const breakdown = computed(() => {
  const items = []

  selectedServices.value.forEach(serviceId => {
    const service = services.find(s => s.id === serviceId)
    if (service && service.basePrice > 0) {
      items.push({
        label: service.name,
        amount: service.basePrice
      })
    }
  })

  if (guestCost.value > 0) {
    items.push({
      label: `Additional guests (${guests.value - 50} × $${pricePerGuest})`,
      amount: guestCost.value
    })
  }

  if (durationCost.value > 0) {
    items.push({
      label: `Extended duration (${duration.value - 4}h × $${pricePerHour})`,
      amount: durationCost.value
    })
  }

  return items
})
</script>

<template>
  <UModal v-model="isOpen" :ui="{ width: 'max-w-2xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <UIcon name="i-heroicons-calculator" class="text-2xl text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Price Calculator
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Estimate the cost for your event
              </p>
            </div>
          </div>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </template>

    <div class="space-y-6">
      <!-- Services Selection -->
      <UFormGroup label="Select Services">
        <div class="space-y-2">
          <UCheckbox
            v-for="service in services"
            :key="service.id"
            v-model="selectedServices"
            :value="service.id"
            :label="`${service.name} ${service.basePrice > 0 ? `($${service.basePrice})` : '(Free)'}`"
          >
            <template #label>
              <div class="flex items-center gap-2">
                <UIcon :name="service.icon" class="text-primary" />
                <span>{{ service.name }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ service.basePrice > 0 ? `$${service.basePrice}` : 'Free' }}
                </span>
              </div>
            </template>
          </UCheckbox>
        </div>
      </UFormGroup>

      <!-- Number of Guests -->
      <UFormGroup
        label="Number of Guests"
        :description="`Base: 50 guests included. Additional: $${pricePerGuest} per guest`"
      >
        <div class="space-y-2">
          <URange
            v-model="guests"
            :min="10"
            :max="500"
            :step="10"
          />
          <div class="flex justify-between items-center">
            <UInput
              v-model.number="guests"
              type="number"
              :min="10"
              :max="500"
              size="sm"
              class="w-24"
            />
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ guests }} guests
            </span>
          </div>
        </div>
      </UFormGroup>

      <!-- Event Duration -->
      <UFormGroup
        label="Event Duration (hours)"
        :description="`Base: 4 hours included. Additional: $${pricePerHour} per hour`"
      >
        <div class="space-y-2">
          <URange
            v-model="duration"
            :min="1"
            :max="12"
            :step="1"
          />
          <div class="flex justify-between items-center">
            <UInput
              v-model.number="duration"
              type="number"
              :min="1"
              :max="12"
              size="sm"
              class="w-24"
            />
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ duration }} hours
            </span>
          </div>
        </div>
      </UFormGroup>

      <!-- Price Breakdown -->
      <div v-if="breakdown.length > 0" class="pt-4 border-t border-gray-200 dark:border-gray-800">
        <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Price Breakdown
        </h4>
        <div class="space-y-2">
          <div
            v-for="(item, index) in breakdown"
            :key="index"
            class="flex justify-between text-sm"
          >
            <span class="text-gray-600 dark:text-gray-400">{{ item.label }}</span>
            <span class="font-medium text-gray-900 dark:text-white">${{ item.amount }}</span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">Estimated Total</p>
          <p class="text-3xl font-bold text-primary">
            ${{ totalPrice.toLocaleString() }}
          </p>
        </div>
      </div>
    </template>
    </UCard>
  </UModal>
</template>
