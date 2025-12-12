import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   build: {
    outDir: 'dist',
    // Opcional: mejora el build para Netlify
    rollupOptions: {
      output: {
        manualChunks: undefined // Para un solo bundle o ajusta según necesidades
      }
    }
  }
})
