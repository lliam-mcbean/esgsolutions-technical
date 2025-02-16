import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import glsl from "vite-plugin-glsl";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    glsl()
  ],
})