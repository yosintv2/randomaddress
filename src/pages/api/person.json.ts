import type { APIRoute } from 'astro';
import { generatePerson } from '../../lib/generator';

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(generatePerson()), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
};
