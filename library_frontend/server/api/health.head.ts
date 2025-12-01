import { H3Event } from 'h3';

/**
 * PUBLIC_INTERFACE
 * HEAD /api/health returns 200 OK with no body.
 */
export default async function handler(_event: H3Event) {
  return new Response(null, { status: 200 });
}
