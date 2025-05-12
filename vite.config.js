import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // Permite acceder desde cualquier IP (0.0.0.0)
    port: 5173,           // Puedes cambiarlo si deseas
    strictPort: true,     // Lanza error si el puerto está ocupado
    cors: true            // Habilita CORS por defecto
  }
})
