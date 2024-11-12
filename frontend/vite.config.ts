import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const root = resolve(__dirname, 'src')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': root,
      '@app-components': resolve(root, 'components'),
      '@app-components/*': resolve(root, 'components/*'),
      '@app-services': resolve(root, 'services'),
      '@app-services/*': resolve(root, 'services/*'),
    }
  },
  server: {
    port: 5173
  }
})
