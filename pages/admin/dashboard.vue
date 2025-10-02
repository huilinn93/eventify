<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Admin Dashboard - Eventify',
  robots: 'noindex, nofollow'
})

interface Entry {
  id: string
  name: string
  email: string
  number: string
  inquiry: string
  otherInfo: string
}

const config = useRuntimeConfig()
const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${config.public.spreadsheetId || '1DTCPSzsvPBxYdq3OOvp8bu1HfU3zv17LqswXrxc2ws4'}`

const { data, pending, error, refresh } = await useFetch<{ data: Entry[] }>('/api/sheets')

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'number', label: 'Phone' },
  { key: 'inquiry', label: 'Inquiry' },
  { key: 'otherInfo', label: 'Additional Info' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <UContainer class="py-12">
      <div class="flex justify-between items-start mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p class="text-gray-600 dark:text-gray-400">View and manage event inquiries</p>
        </div>
        <div class="flex gap-3">
          <UButton 
            :to="spreadsheetUrl"
            external
            target="_blank"
            icon="i-heroicons-document-text"
            size="lg"
            color="green"
          >
            Open Google Sheet
          </UButton>
          <UButton 
            icon="i-heroicons-arrow-path"
            size="lg"
            variant="outline"
            @click="refresh()"
            :loading="pending"
          >
            Refresh
          </UButton>
        </div>
      </div>

      <UAlert
        v-if="error"
        icon="i-heroicons-exclamation-triangle"
        color="red"
        variant="soft"
        title="Error loading data"
        :description="error.message"
        class="mb-6"
      />

      <UCard :ui="{ body: { padding: '' } }">
        <div v-if="pending" class="flex flex-col items-center justify-center py-16">
          <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary mb-4" />
          <p class="text-gray-600 dark:text-gray-400">Loading inquiries...</p>
        </div>

        <div v-else-if="data?.data && data.data.length > 0">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Total Inquiries: <span class="font-semibold text-gray-900 dark:text-white">{{ data.data.length }}</span>
            </p>
          </div>
          <UTable
            :rows="data.data"
            :columns="columns"
            :ui="{ 
              th: { padding: 'px-6 py-4' },
              td: { padding: 'px-6 py-4' }
            }"
          />
        </div>

        <div v-else class="text-center py-16">
          <UIcon name="i-heroicons-inbox" class="text-5xl text-gray-400 dark:text-gray-600 mb-4" />
          <p class="text-gray-600 dark:text-gray-400 text-lg mb-2">No inquiries yet</p>
          <p class="text-gray-500 dark:text-gray-500 text-sm">
            Submissions from the contact form will appear here
          </p>
        </div>
      </UCard>

      <div class="mt-6 flex justify-between items-center">
        <UButton to="/" variant="ghost" color="gray" icon="i-heroicons-arrow-left">
          Back to Home
        </UButton>
        <p class="text-sm text-gray-500 dark:text-gray-600">
          Last updated: {{ new Date().toLocaleString() }}
        </p>
      </div>
    </UContainer>
  </div>
</template>
