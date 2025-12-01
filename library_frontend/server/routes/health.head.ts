import { defineEventHandler } from 'h3';

/**
 * PUBLIC_INTERFACE
 * Lightweight HEAD health route.
 * Route: HEAD /health
 * Returns empty body with 200 OK
 */
export default defineEventHandler((_event) => {
  return new Response(null, { status: 200 });
});
