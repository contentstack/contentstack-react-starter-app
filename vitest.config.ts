/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import path from 'path'

// https://vitest.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@helper': path.resolve(__dirname, './src/helper'),
      '@sdk': path.resolve(__dirname, './src/sdk'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // Include test coverage for better reporting
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    // Exclude unnecessary files from test runs
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
})
