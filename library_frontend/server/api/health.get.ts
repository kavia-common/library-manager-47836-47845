import { H3Event } from 'h3';

/**
 * PUBLIC_INTERFACE
 * Simple health check endpoint to verify the server is up.
 * Method: GET
 * Route: /api/health
 * Returns: { status: 'ok', timestamp: number }
 */
export default async function handler(_event: H3Event) {
  // Minimal server-side log to confirm handler is executed in SSR envs
  try {
    // eslint-disable-next-line no-console
    console.log('[api] /api/health hit');
  } catch {
    // no-op
  }
  return {
    status: 'ok',
    timestamp: Date.now(),
  };
}
