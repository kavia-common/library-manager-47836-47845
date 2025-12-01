import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// Utility to parse comma-separated env list
function parseCsv(envVar?: string): string[] {
  if (!envVar) return [];
  return envVar.split(',').map((s) => s.trim()).filter(Boolean);
}

// Constants and env
const hardcodedHost = 'vscode-internal-34023-qa.qa01.cloud.kavia.ai';
const envAllowedHosts = parseCsv(process.env.ALLOWED_HOSTS);
const allowedHosts = Array.from(new Set([hardcodedHost, ...envAllowedHosts]));
const port = Number(process.env.NUXT_PUBLIC_PORT || process.env.PORT || 3000);
const hmrClientPort = process.env.HMR_CLIENT_PORT
  ? Number(process.env.HMR_CLIENT_PORT)
  : process.env.NUXT_PUBLIC_PORT
    ? Number(process.env.NUXT_PUBLIC_PORT)
    : undefined;

export default defineConfig({
  // Keep config Nuxt-compatible; Nuxt merges this into its own Vite config.
  server: {
    host: true,          // listen on 0.0.0.0
    port,
    strictPort: true,    // fail if the port is taken to avoid silent port changes
    allowedHosts,
    hmr: {
      // Use env-provided clientPort when present (helpful behind proxies)
      ...(hmrClientPort ? { clientPort: hmrClientPort } : {}),
    },
  },
  preview: {
    host: true,
    port,
    strictPort: true,
    allowedHosts,
  },
  resolve: {
    alias: {
      // Typical alias mapping for consistency; Nuxt already sets these internally
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
