import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 3000,
    open: '/index.html'
  },
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        servicos: '/pages/servicos.html',
        sobre: '/pages/sobre.html',
        contato: '/pages/contato.html'
      }
    }
  }
})
