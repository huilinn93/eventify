export default {
  theme: {
    extend: {
      fontFamily: {
        display: ['Press Start 2P', 'monospace'], // Retro pixel font
        pixel: ['Silkscreen', 'Press Start 2P', 'monospace'], // Pixel fonts
        sans: ['Space Mono', 'monospace'], // Pixel-style body font
        mono: ['Space Mono', 'monospace'],
      },
      fontSize: {
        // Custom display sizes for impact
        'display-2xl': ['5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      backgroundImage: {
        'gradient-pixel-elegant': 'linear-gradient(135deg, #FFB5D8 0%, #D4C5F9 50%, #B5E7DD 100%)',
        'gradient-rose-gold': 'linear-gradient(135deg, #FFD4B8 0%, #E8B298 50%, #D4976F 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #FFF5F9 0%, #F5F3F7 100%)',
        'gradient-dark': 'linear-gradient(180deg, #2A2438 0%, #1A1624 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(255, 181, 216, 0.2), 0 2px 6px -2px rgba(255, 181, 216, 0.15)',
        'elegant': '0 4px 20px -2px rgba(232, 178, 152, 0.25), 0 2px 10px -2px rgba(232, 178, 152, 0.2)',
        'elegant-lg': '0 10px 40px -5px rgba(232, 178, 152, 0.35), 0 4px 15px -3px rgba(232, 178, 152, 0.25)',
        'pixel': '4px 4px 0px rgba(61, 53, 71, 0.15)',
        'pixel-hover': '6px 6px 0px rgba(61, 53, 71, 0.25)',
      },
      borderRadius: {
        'pixel': '2px', // Subtle pixel-inspired corners
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
}
