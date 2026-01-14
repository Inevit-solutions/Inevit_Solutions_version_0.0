import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Proxy removed - Vercel dev handles API routes automatically
        // If using vite directly, uncomment and point to your API server
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     secure: false
        //   }
        // },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 1500, // Increased since we're code-splitting properly
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              // Split node_modules into smaller chunks
              if (id.includes('node_modules')) {
                // Three.js and related libraries (largest, separate chunk)
                if (id.includes('three') || id.includes('@react-three')) {
                  return 'three-vendor';
                }
                // React core (must be separate to avoid circular deps)
                if (id.includes('react') && !id.includes('react-dom')) {
                  return 'react-core';
                }
                if (id.includes('react-dom')) {
                  return 'react-dom';
                }
                // Framer Motion (separate chunk)
                if (id.includes('framer-motion')) {
                  return 'framer-vendor';
                }
                // Other node_modules go into a separate chunk (avoid circular deps)
                return 'vendor';
              }
            }
          }
        },
        // Use esbuild for faster, more memory-efficient builds
        minify: 'esbuild',
        target: 'es2022',
        // Reduce memory usage during build
        sourcemap: false,
      },
    };
});
