export default defineAppConfig({
  ui: {
    primary: 'primary',
    gray: 'secondary',

    // Global UI component theme
    card: {
      shadow: 'shadow-elegant',
      ring: 'ring-1 ring-primary-100 dark:ring-secondary-800',
    },
    button: {
      rounded: 'rounded-lg',
      font: 'font-sans font-medium',
      default: {
        loadingIcon: 'i-heroicons-arrow-path-20-solid'
      },
      color: {
        primary: {
          solid: 'bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 aria-disabled:bg-primary-500 text-secondary-900 dark:bg-primary-500 dark:hover:bg-primary-600 dark:disabled:bg-primary-500 dark:aria-disabled:bg-primary-500 dark:text-secondary-white focus-visible:outline-primary-500 dark:focus-visible:outline-primary-500'
        }
      }
    },
    input: {
      rounded: 'rounded-lg',
      default: {
        size: 'md'
      }
    },
    modal: {
      rounded: 'rounded-xl',
      shadow: 'shadow-elegant-lg',
      overlay: {
        background: 'bg-secondary-900/75 dark:bg-secondary-950/90'
      }
    },
    notifications: {
      position: 'top-0 bottom-auto'
    }
  }
})
