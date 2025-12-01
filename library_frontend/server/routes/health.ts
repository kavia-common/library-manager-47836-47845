import { defineEventHandler } from 'h3';

/**
 * PUBLIC_INTERFACE
 * Lightweight non-API health route.
 * Route: GET /health
 * Returns plain text 'OK'
 */
export default defineEventHandler((event) => {
  try {
    const ip =
      (event.node.req.headers['x-forwarded-for'] as string) ||
      event.node.req.socket.remoteAddress ||
      'unknown';
    // eslint-disable-next-line no-console
    console.log('[route] /health OK from', ip);
  } catch {
    // no-op
  }
  return 'OK';
});
