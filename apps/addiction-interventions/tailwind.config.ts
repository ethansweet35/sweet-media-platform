/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "../../packages/admin-core/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ['Inter', 'Georgia', 'serif'],
          sans: ['DM Sans', 'system-ui', 'sans-serif'],
        },
        colors: {
          cream: '#F8FAFC',
          sand: '#E2E8F0',
          forest: '#1F2937',
          'forest-dark': '#3A4A3C',
          sage: '#6B7D67',
          terracotta: '#2563EB',
          ochre: '#DDA15E',
          leaf: '#8FA489',
        },
      },
    },
    plugins: [],
  };

export default config;