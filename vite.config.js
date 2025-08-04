import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
  ],
  server: {
    host: '127.0.0.1',
    port: 3000
  }
});
