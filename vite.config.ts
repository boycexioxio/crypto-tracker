import * as path from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/crypto-tracker/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
