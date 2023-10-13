import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://localhost',
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/api/, '')
//       }
//     },
// },
optimizeDeps: {
  include: ['esm-dep > cjs-dep'],
},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
