import { defineEventHandler } from 'h3';

/**
 * PUBLIC_INTERFACE
 * Lightweight non-API health route.
 * Route: GET /health
 * Returns plain text 'OK'
 */
export default defineEventHandler(() => {
  return 'OK';
});
