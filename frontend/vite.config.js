import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/v1': {
        target: 'https://chat-app-production-4500.up.railway.app/api',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
