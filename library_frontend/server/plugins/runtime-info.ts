/**
 * PUBLIC_INTERFACE
 * Nitro plugin that logs minimal runtime info on server start.
 * Uses internal Nitro plugin registration to be compatible with server runtime bundling.
 */
export default defineNitroPlugin((nitroApp) => {
  try {
    // eslint-disable-next-line no-console
    console.log('[nitro] startup', {
      envPort: process.env.PORT || process.env.NITRO_PORT || process.env.NUXT_PUBLIC_PORT || '3000',
      nodeEnv: process.env.NODE_ENV,
    });
  } catch {
    // no-op
  }

  // Minimal header for diagnostics on responses
  nitroApp.hooks.hook('request', (event) => {
    try {
      event.node.res.setHeader('X-Ocean-Library', 'ok');
    } catch {
      // no-op
    }
  });
});

// Use Nitro's global defineNitroPlugin without importing nitropack (Nuxt exposes it in server context)
/* global defineNitroPlugin */
