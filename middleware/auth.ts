export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Check auth status on client side
  if (import.meta.client) {
    authStore.checkAuth()
  }

  // If not authenticated and trying to access admin routes
  if (!authStore.isAuthenticated && to.path.startsWith('/admin')) {
    return navigateTo('/')
  }
})
