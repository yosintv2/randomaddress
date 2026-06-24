import type { APIRoute } from 'astro';
import { generateUsername } from '../../lib/generator';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const usernames = Array.from({ length: count }, generateUsername);
  return new Response(JSON.stringify(usernames), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
};
