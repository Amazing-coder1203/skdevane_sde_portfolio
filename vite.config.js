import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/SKDevane_Data_Portfolio/",
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'three'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
})
