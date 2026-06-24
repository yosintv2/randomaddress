import { generatePerson } from '../../src/lib/generator';

export async function onRequestGet() {
  return new Response(JSON.stringify(generatePerson()), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
}
