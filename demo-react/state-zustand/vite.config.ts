import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-state-zustand/',
  plugins: [react()],
  server: {
    port: 3105,
  }
})
