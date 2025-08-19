import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths({
      projects: [path.resolve(__dirname, './tsconfig.json')],
      root: path.resolve(__dirname, './')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src')
    }
  }
})
