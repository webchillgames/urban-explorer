import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/urban-explorer/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('a-')
        }
      }
    })
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/variables.scss";
          @import "./src/styles/mixins.scss"; 
          @import "./src/styles/base.scss";
        `
      }
    }
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true
  }
})
