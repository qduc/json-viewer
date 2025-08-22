import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/json-viewer/",
  plugins: [react()],
  // PostCSS configuration is automatically loaded from postcss.config.js
})
