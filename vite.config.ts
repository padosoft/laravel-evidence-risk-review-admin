import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/vendor/evidence-risk-review-admin/',
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: 'public/vendor/evidence-risk-review-admin',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: 'resources/js/main.tsx',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/js/setup.ts'],
    include: ['tests/js/**/*.test.{ts,tsx}'],
    globals: true,
  },
});
