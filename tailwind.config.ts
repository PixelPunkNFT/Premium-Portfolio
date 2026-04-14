import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        'gold': '#D4AF37',
        'gold-light': '#F4E4B5',
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(212, 175, 55, 0.3)',
        'premium-hover': '0 20px 50px -10px rgba(212, 175, 55, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
