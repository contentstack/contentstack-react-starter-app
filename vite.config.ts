import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add component path aliases for easier imports
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@helper': path.resolve(__dirname, './src/helper'),
      '@sdk': path.resolve(__dirname, './src/sdk'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
    // Add HMR setup for better development experience
    hmr: {
      overlay: true,
    },
  },
  // Add build optimizations
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Increase the warning limit to reduce noise for larger chunks
    chunkSizeWarningLimit: 600,
    // Chunk splitting strategy for better caching
    rollupOptions: {
      output: {
        // Code splitting configuration
        manualChunks: (id) => {
          // Split React and related packages
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }
          
          // Split Contentstack SDK and related packages
          if (id.includes('node_modules/contentstack') || 
              id.includes('node_modules/@contentstack')) {
            return 'contentstack-vendor';
          }
          
          // Split React Router and related packages
          if (id.includes('node_modules/react-router') || 
              id.includes('node_modules/@remix-run') || 
              id.includes('node_modules/react-router-dom')) {
            return 'router-vendor';
          }
          
          // Split other common libraries
          if (id.includes('node_modules/')) {
            // Create a chunk for any remaining node_modules
            return 'vendor';
          }
        },
        // Configure chunk naming format to include content hashes
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  define: {
    // Handle process.env references
    'process.env': process.env,
  },
});
