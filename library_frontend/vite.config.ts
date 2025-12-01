import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// Utility to parse comma-separated env list
function parseAllowedHosts(envVar?: string): string[] {
  if (!envVar) return [];
  return envVar
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

// Static preview host plus env-driven flexibility
const previewHost = 'vscode-internal-34023-qa.qa01.cloud.kavia.ai';
const envAllowedHosts = parseAllowedHosts(process.env.ALLOWED_HOSTS);
const allowedHosts = Array.from(new Set([previewHost, ...envAllowedHosts]));

export default defineConfig({
  // Keep config Nuxt-compatible; Nuxt merges this into its own Vite config.
  server: {
    // host: true makes Vite listen on all addresses (0.0.0.0)
    host: true,
    // Prefer NUXT_PUBLIC_PORT if set; otherwise 3000
    port: Number(process.env.NUXT_PUBLIC_PORT) || 3000,
    // Allow explicit hosts (Vite 5 supports string[] for allowedHosts)
    allowedHosts
  },
  preview: {
    host: true,
    port: Number(process.env.NUXT_PUBLIC_PORT) || 3000,
  },
  resolve: {
    alias: {
      // Typical alias mapping for consistency; Nuxt already sets these internally
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
