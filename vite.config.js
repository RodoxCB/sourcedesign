import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        servicos: 'pages/servicos.html',
        sobre: 'pages/sobre.html',
        contato: 'pages/contato.html'
      }
    }
  },
  publicDir: 'assets'
})
