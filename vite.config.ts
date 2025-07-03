import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: '/',
    proxy:{
      '/api':{
        target: "http://localhost:3033"
      }
    }
  },
  resolve: {
    alias:{
      '@': path.resolve(__dirname,'src')
    }
  },
  css:{
    modules: {
    localsConvention: 'camelCaseOnly', // optional
  },
    preprocessorOptions:{
      scss:{
        additionalData: `@import '@/styles/variables.scss';`
      }
    }
  },
  plugins: [react()],
})
