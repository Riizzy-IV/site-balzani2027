import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const page = (p) => fileURLToPath(new URL(p, import.meta.url))

// Site multipágina: cada página tem seu index.html (funciona em qualquer hospedagem estática)
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        sobre: page('./sobre/index.html'),
        servicos: page('./servicos/index.html'),
        'formula-vertice': page('./servicos/formula-vertice/index.html'),
        'case-helena-bay': page('./cases/helena-bay/index.html'),
        'case-leman-view': page('./cases/leman-view/index.html'),
        'case-madri': page('./cases/madri/index.html'),
        'case-edificio-central': page('./cases/edificio-central/index.html'),
        'case-recanto': page('./cases/recanto-do-tatuamunha/index.html'),
      },
    },
  },
})
