import type { APIRoute } from 'astro';
import { generateEmail } from '../../lib/generator';

export const GET: APIRoute = async ({ url }) => {
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const emails = Array.from({ length: count }, generateEmail);
  return new Response(JSON.stringify(emails), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
};
