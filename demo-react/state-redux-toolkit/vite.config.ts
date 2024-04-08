import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-state-redux-toolkit/',
  plugins: [react()],
  server: {
    port: 3103,
  }
})
