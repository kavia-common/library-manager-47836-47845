import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

/**
 * Note: Nuxt merges this vite.config.ts with its internal Vite config and any `vite` block from nuxt.config.ts.
 * We keep values consistent to avoid conflicts. This file mainly centralizes allowedHosts/HMR behavior for preview proxies.
 */

// Utility to parse comma-separated env list
function parseCsv(envVar?: string): string[] {
  if (!envVar) return [];
  return envVar.split(',').map((s) => s.trim()).filter(Boolean);
}

// Constants and env
const hardcodedHost = 'vscode-internal-34023-qa.qa01.cloud.kavia.ai';
const envAllowedHosts = parseCsv(process.env.ALLOWED_HOSTS);
const wildcardHosts = ['*.cloud.kavia.ai'];
const allowedHosts = Array.from(new Set([hardcodedHost, ...wildcardHosts, ...envAllowedHosts]));
const port = Number(process.env.NUXT_PUBLIC_PORT || process.env.PORT || 3000);

// Prefer explicit HMR client port when behind TLS proxies; fall back to same as port
const hmrClientPort =
  process.env.HMR_CLIENT_PORT
    ? Number(process.env.HMR_CLIENT_PORT)
    : process.env.NUXT_PUBLIC_PORT
      ? Number(process.env.NUXT_PUBLIC_PORT)
      : undefined;

export default defineConfig({
  server: {
    host: true,          // listen on 0.0.0.0
    port,
    strictPort: true,    // fail if the port is taken to avoid silent port changes
    allowedHosts,
    origin: (() => {
      const envOrigin =
        process.env.NUXT_PUBLIC_FRONTEND_URL ||
        process.env.FRONTEND_URL ||
        '';
      return envOrigin || `https://${hardcodedHost}:${port}`;
    })(),
    hmr: (() => {
      const host =
        process.env.HMR_HOST ||
        process.env.PREVIEW_HOST ||
        hardcodedHost;
      return {
        ...(hmrClientPort ? { clientPort: hmrClientPort } : {}),
        host,
        protocol: 'wss'
      };
    })(),
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
