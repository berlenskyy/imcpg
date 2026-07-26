import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement pour le mode actuel
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  console.log(`Mode: ${mode}, API URL: ${env.VITE_API_URL}`);// pour vérifier que les variables sont bien chargées

  return {
    base: "./",// pour que les assets soient chargés correctement même si l'app est servie depuis un sous-chemin
    plugins: [react()], // Proxy pour éviter les problèmes de CORS en développement
    server: {
      // Proxy pour éviter les problèmes de CORS en développement
      proxy: mode === 'development' ? {
        '/api': {// Proxy toutes les requêtes commençant par /api
          target:  'http://localhost:8080'|| env.VITE_API_URL ,  // ← le Spring Boot
          changeOrigin: true, // nécessaire pour que le backend pense que la requête vient de lui
        }
      }:{}// en production, pas de proxy, les requêtes vont directement à l'API
    }
  }
})
