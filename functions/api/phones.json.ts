import { generatePhoneNumber } from '../../src/lib/generator';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const state = url.searchParams.get('state') || undefined;
  const phones = Array.from({ length: count }, () => generatePhoneNumber(state));
  return new Response(JSON.stringify(phones), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
}
