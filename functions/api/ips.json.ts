import { generateIP } from '../../src/lib/generator';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const ips = Array.from({ length: count }, generateIP);
  return new Response(JSON.stringify(ips), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
}
