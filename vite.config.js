import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/salvar_resultado': 'http://localhost:5001',
      '/ranking': 'http://localhost:5001',
    }
  }
})
