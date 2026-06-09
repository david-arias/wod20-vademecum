import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // Move Vite's dep cache out of node_modules to avoid EACCES permission errors
  cacheDir: '.vite-cache',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
