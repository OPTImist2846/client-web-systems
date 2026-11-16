import { defineConfig } from 'vite';

export default defineConfig({
  base: './',

  server: {
    port: 9000,
    open: true,
  },

  preview: {
    port: 9000,
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
});
