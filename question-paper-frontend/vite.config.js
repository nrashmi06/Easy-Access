// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Inspect from 'vite-plugin-inspect'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [react(), tailwindcss(), Inspect(),compression({ algorithm: 'brotliCompress' }),],
})
