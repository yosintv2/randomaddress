import type { APIRoute } from 'astro';
import { generateIP } from '../../lib/generator';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const ips = Array.from({ length: count }, generateIP);
  return new Response(JSON.stringify(ips), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
};
