import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true,
            secure: false
          }
        },
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
                if (id.includes('three') || id.includes('@react-three')) {
                  return 'three-vendor';
                }
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'react-vendor';
                }
                if (id.includes('framer-motion')) {
                  return 'framer-vendor';
                }
                // Other node_modules go into a separate chunk
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
