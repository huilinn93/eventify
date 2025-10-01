// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  
  colorMode: {
    preference: 'dark'
  },

  ui: {
    global: true
  },
  
  runtimeConfig: {
    googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY || '',
    googleSpreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || '',
    public: {
      appName: 'Eventify',
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || ''
    }
  },

  typescript: {
    strict: true,
    typeCheck: true
  },

  eslint: {
    config: {
      stylistic: true
    }
  }
})
