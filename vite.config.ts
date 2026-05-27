import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()].flat(),
  base: '/LANDAGRI-B_Dashboard/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Plotly - largest library, separate chunk
          if (id.includes('plotly.js-dist-min')) return 'plotly'
          // React Router - often changes less
          if (id.includes('react-router')) return 'router'
          // Leaflet - only used on overview map
          if (id.includes('leaflet')) return 'leaflet'
          // Other node_modules in a vendor chunk
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
