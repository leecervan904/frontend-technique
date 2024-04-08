import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-router-v6/',
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^\/@\//,
        replacement: resolve(__dirname, './src') + '/',
      }
    ]
  },
  server: {
    port: 3101,
  }
})
