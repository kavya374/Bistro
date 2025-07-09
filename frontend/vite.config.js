import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: './', 
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    rollupOptions: {
      input: '/index.html'
    }
  },
  // This is the fix that matters:
  resolve: {
    alias: {
      // React Router must resolve correctly
      '@': '/src'
    }
  }
})
