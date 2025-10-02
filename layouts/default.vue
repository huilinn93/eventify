<script setup lang="ts">
const route = useRoute()
const isSidebarOpen = ref(true)

const isLandingPage = computed(() => route.path === '/')

const navigationItems = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'About',
    icon: 'i-heroicons-information-circle',
    to: '/about'
  },
  {
    label: 'Services',
    icon: 'i-heroicons-sparkles',
    to: '/services'
  },
  {
    label: 'Contact',
    icon: 'i-heroicons-envelope',
    to: '/contact'
  }
]

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Landing page - no sidebar -->
    <div v-if="isLandingPage">
      <slot />
    </div>

    <!-- Other pages - with sidebar -->
    <div v-else class="flex min-h-screen">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40',
          isSidebarOpen ? 'w-64' : 'w-16'
        ]"
      >
        <!-- Toggle Button -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2
            v-if="isSidebarOpen"
            class="text-xl font-bold text-gray-900 dark:text-white"
          >
            Eventify
          </h2>
          <UButton
            :icon="isSidebarOpen ? 'i-heroicons-bars-3-bottom-left' : 'i-heroicons-bars-3'"
            variant="ghost"
            color="gray"
            @click="toggleSidebar"
            :class="!isSidebarOpen && 'mx-auto'"
          />
        </div>

        <!-- Navigation -->
        <nav class="p-4 space-y-2">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            active-class="bg-primary-100 dark:bg-primary-900/20 text-primary"
            exact
          >
            <UIcon :name="item.icon" class="text-xl shrink-0" />
            <span
              v-if="isSidebarOpen"
              class="font-medium text-gray-700 dark:text-gray-300"
            >
              {{ item.label }}
            </span>
          </NuxtLink>
        </nav>

        <!-- Admin Link (Bottom) -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <button
            type="button"
            class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-neutral-100 text-primary-700 w-full"
            @click="$emit('show-admin-login')"
          >
            <UIcon name="i-heroicons-lock-closed" class="text-xl shrink-0" />
            <span
              v-if="isSidebarOpen"
              class="font-medium text-sm"
            >
              Admin
            </span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main
        :class="[
          'flex-1 transition-all duration-300',
          isSidebarOpen ? 'ml-64' : 'ml-16'
        ]"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
