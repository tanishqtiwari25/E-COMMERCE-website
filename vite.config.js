import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // <--- Bas './' hona chahiye, repository ka naam nahi!
  server: {
    port: 5173,
  },
});