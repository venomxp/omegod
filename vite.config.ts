import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { attachSocketServer } from './socketServer';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'socket-io-server',
          configureServer(server) {
            if (server.httpServer) {
              attachSocketServer(server.httpServer as any);
            }
            server.middlewares.use('/api/geoip', (req, res) => {
              const cfCountry = req.headers['cf-ipcountry'] as string | undefined;
              const forwarded = req.headers['x-forwarded-for'] as string | undefined;
              const ip = (req.headers['cf-connecting-ip'] as string) || (forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress) || '';
              const countryCode = (cfCountry && cfCountry !== 'XX') ? cfCountry.toUpperCase() : 'MA';
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ip, countryCode }));
            });
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
