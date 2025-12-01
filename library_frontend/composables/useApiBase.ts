type ApiBase = {
  apiBase?: string;
  backendUrl?: string;
  frontendUrl?: string;
  wsUrl?: string;
};

/**
 * PUBLIC_INTERFACE
 * Returns public runtime URLs if provided; otherwise undefined. Client should guard use.
 */
export function useApiBase(): ApiBase {
  const runtime = useRuntimeConfig();
  return {
    apiBase: (runtime.public as any)?.API_BASE || process.env.NUXT_PUBLIC_API_BASE,
    backendUrl: (runtime.public as any)?.BACKEND_URL || process.env.NUXT_PUBLIC_BACKEND_URL,
    frontendUrl: (runtime.public as any)?.FRONTEND_URL || process.env.NUXT_PUBLIC_FRONTEND_URL,
    wsUrl: (runtime.public as any)?.WS_URL || process.env.NUXT_PUBLIC_WS_URL,
  };
}
