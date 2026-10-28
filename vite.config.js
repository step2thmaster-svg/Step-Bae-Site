import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // six pages: home, About, the Craftsmanship gallery, Dentist Partnership, Consultation and Insights
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        craftsmanship: resolve(import.meta.dirname, 'craftsmanship.html'),
        partnership: resolve(import.meta.dirname, 'partnership.html'),
        consultation: resolve(import.meta.dirname, 'consultation.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        insights: resolve(import.meta.dirname, 'insights.html'),
      },
    },
  },
})
