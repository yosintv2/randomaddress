import { generateCompanyName } from '../../src/lib/generator';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const companies = Array.from({ length: count }, generateCompanyName);
  return new Response(JSON.stringify(companies), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
}
