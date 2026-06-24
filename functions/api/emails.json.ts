import { generateEmail } from '../../src/lib/generator';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const emails = Array.from({ length: count }, generateEmail);
  return new Response(JSON.stringify(emails), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
}
