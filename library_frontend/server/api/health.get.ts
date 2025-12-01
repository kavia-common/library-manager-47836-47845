import { H3Event } from 'h3';

/**
 * PUBLIC_INTERFACE
 * Simple health check endpoint to verify the server is up.
 * Method: GET
 * Route: /api/health
 * Returns: { status: 'ok', timestamp: number }
 */
export default async function handler(_event: H3Event) {
  return {
    status: 'ok',
    timestamp: Date.now(),
  };
}
