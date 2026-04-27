import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx}',
],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#e5e7eb',      // #E5E7EB - text
          100: '#9ca3af',     // #9CA3AF - subtext
          200: '#1f2937',     // #1F2937 - section bg
          300: '#111827',     // #111827 - card bg
          400: '#020617',     // #020617 - main bg
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(156, 163, 175, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(156, 163, 175, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
export default config