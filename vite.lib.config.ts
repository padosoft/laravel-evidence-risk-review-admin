import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'resources/js/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['@tanstack/react-query', 'axios', 'clsx', 'lucide-react', 'react', 'react-dom', 'react-dom/client', 'react-router-dom', 'tailwind-merge'],
      output: {
        assetFileNames: 'style.[ext]',
      },
    },
  },
});
