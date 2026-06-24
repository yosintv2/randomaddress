import type { APIRoute } from 'astro';
import { generatePhoneNumber } from '../../lib/generator';

export const GET: APIRoute = async ({ url }) => {
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const state = url.searchParams.get('state') || undefined;
  const phones = Array.from({ length: count }, () => generatePhoneNumber(state));
  return new Response(JSON.stringify(phones), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
};
