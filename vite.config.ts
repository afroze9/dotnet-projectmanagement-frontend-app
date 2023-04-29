/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    target: 'esnext',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: [/solid-js/, /@solidjs\/testing - library/],
    },
    transformMode: {
      web: [/.[jt]sx?/],
    },
    setupFiles: './setupVitest.js',
    threads: false,
    isolate: false,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    }
  },
});
