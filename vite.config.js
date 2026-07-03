import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/E-COMMERCE-website/', // <─── Apni GitHub repository ka exact naam yahan daalo
  server: {
    port: 5173,
  },
});