import { defineConfig } from 'vite';

export default defineConfig({
  // Base path para GitHub Pages (facttic/guiareforma)
  base: '/guiareforma/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'd3': ['d3'],
          'scrollama': ['scrollama']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 4173
  },
  // Optimización para D3
  optimizeDeps: {
    include: ['d3', 'scrollama', 'topojson-client']
  }
});
