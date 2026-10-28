import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Des chemins relatifs permettent au build de fonctionner aussi bien à la
  // racine d'un domaine que sous https://utilisateur.github.io/nom-du-depot/.
  base: './',
  plugins: [react()],
  build: { sourcemap: true },
})
