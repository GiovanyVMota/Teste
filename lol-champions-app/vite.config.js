// lol-champions-app/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Adicione esta seção para configurar o proxy
  server: {
    proxy: {
      // Todas as chamadas que começarem com '/api'
      '/api': {
        // Serão redirecionadas para o seu backend
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})