import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/stores': resolve('src/renderer/src/stores'),
        '@/components': resolve('src/renderer/src/components'),
        '@/pages': resolve('src/renderer/src/pages'),
        '@/utils': resolve('src/renderer/src/utils')
      }
    },
    plugins: [
      react()
    ]
  }
})
