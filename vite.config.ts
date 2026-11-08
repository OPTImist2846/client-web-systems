import { defineConfig } from 'vite';

// Vite з коробки компілює TypeScript (esbuild/oxc), обробляє CSS/SCSS (потрібен лише пакет sass)
// і копіює public/ у збірку — тому окремі лоадери та плагіни не потрібні.
export default defineConfig({
  // Відносні шляхи — збірка працює і на localhost, і на gh-pages (https://<user>.github.io/<repo>/)
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
