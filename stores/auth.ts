import { defineStore } from 'pinia'

interface User {
  username: string
  role: 'admin'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    login(username: string, password: string) {
      // Simple hardcoded authentication
      // In production, this should call an API
      if (username === 'admin' && password === 'admin123') {
        this.user = {
          username,
          role: 'admin'
        }
        this.isAuthenticated = true

        // Store in localStorage for persistence
        if (import.meta.client) {
          localStorage.setItem('auth', JSON.stringify(this.user))
        }

        return true
      }
      return false
    },

    logout() {
      this.user = null
      this.isAuthenticated = false

      // Remove from localStorage
      if (import.meta.client) {
        localStorage.removeItem('auth')
      }
    },

    checkAuth() {
      // Check localStorage on client side
      if (import.meta.client) {
        const stored = localStorage.getItem('auth')
        if (stored) {
          try {
            this.user = JSON.parse(stored)
            this.isAuthenticated = true
          } catch {
            localStorage.removeItem('auth')
          }
        }
      }
    }
  },

  getters: {
    isAdmin: (state) => state.isAuthenticated && state.user?.role === 'admin'
  }
})
