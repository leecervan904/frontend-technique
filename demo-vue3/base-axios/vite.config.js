import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3-base-axios/',
  plugins: [vue()],
  server: {
    port: 3202,
    proxy: {
      '^/api': {
        // target: 'http://localhost:3002',
        // target: 'http://api.music.lizhiwen.online/',
        target: 'http://open.lizhiwen.online/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
})
