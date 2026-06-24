import type { APIRoute } from 'astro';
import { generateCompanyName } from '../../lib/generator';

export const GET: APIRoute = async ({ url }) => {
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const companies = Array.from({ length: count }, generateCompanyName);
  return new Response(JSON.stringify(companies), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
};
