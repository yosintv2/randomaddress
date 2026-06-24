import { generatePerson } from '../../src/lib/generator';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const count = Math.min(parseInt(url.searchParams.get('count') || '10'), 100);
  const names = Array.from({ length: count }, () => {
    const p = generatePerson();
    return { name: p.name, firstName: p.firstName, lastName: p.lastName, gender: p.gender };
  });
  return new Response(JSON.stringify(names), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
}
