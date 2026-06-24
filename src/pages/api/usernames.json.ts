import type { APIRoute } from 'astro';
import { generateUsername } from '../../lib/generator';

export const GET: APIRoute = async ({ url }) => {
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const usernames = Array.from({ length: count }, generateUsername);
  return new Response(JSON.stringify(usernames), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
};
