import type { APIRoute } from 'astro';
import { generateAddress, generateAddressForState, generateAddressForCity, generateAddressForZip } from '../../lib/generator';

export const GET: APIRoute = async ({ url }) => {
  const state = url.searchParams.get('state');
  const city = url.searchParams.get('city');
  const zip = url.searchParams.get('zip');

  let address;
  if (zip) {
    address = generateAddressForZip(zip);
  } else if (city) {
    address = generateAddressForCity(city);
  } else if (state) {
    address = generateAddressForState(state);
  } else {
    address = generateAddress();
  }

  return new Response(JSON.stringify(address), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  });
};
