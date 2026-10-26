import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A relative base ("./") makes the build work unchanged on GitHub Pages
// (user site or project repository), Netlify and Vercel. Project detail
// pages use a query string (?project=slug) instead of nested paths, so no
// SPA fallback is required on any static host.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
