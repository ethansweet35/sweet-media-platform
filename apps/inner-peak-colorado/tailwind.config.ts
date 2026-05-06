/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "../../packages/admin-core/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ['Cormorant Garamond', 'Georgia', 'serif'],
          sans: ['DM Sans', 'system-ui', 'sans-serif'],
        },
        colors: {
          cream: '#FAF8F5',
          sand: '#F0ECE1',
          forest: '#2C3B2E',
          'forest-dark': '#3A4A3C',
          sage: '#6B7D67',
          terracotta: '#C8795A',
          ochre: '#DDA15E',
          leaf: '#8FA489',
        },
      },
    },
    plugins: [],
  }