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

  // Helper to coerce empty strings to undefined for safer downstream checks
  const clean = (val: unknown): string | undefined => {
    if (typeof val !== 'string') return undefined;
    const trimmed = val.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  };

  return {
    apiBase: clean((runtime.public as any)?.API_BASE) ?? clean(process.env.NUXT_PUBLIC_API_BASE),
    backendUrl: clean((runtime.public as any)?.BACKEND_URL) ?? clean(process.env.NUXT_PUBLIC_BACKEND_URL),
    frontendUrl: clean((runtime.public as any)?.FRONTEND_URL) ?? clean(process.env.NUXT_PUBLIC_FRONTEND_URL),
    wsUrl: clean((runtime.public as any)?.WS_URL) ?? clean(process.env.NUXT_PUBLIC_WS_URL),
  };
}
