import type { APIRoute } from 'astro';
import { getStates, getCities, getZipcodes, getStreets } from '../lib/generator';
import { SITE_URL } from '../lib/seo';
import { articles } from '../lib/blog';

const staticPages = [
  '', 'about/', 'contact/', 'privacy-policy/', 'terms/', 'cookie-policy/',
  'disclaimer/', 'dmca/', 'all-tools/', 'blog/',
  'random-address-generator/', 'test-address-generator/', 'street-address-generator/',
  'random-person-generator/', 'name-generator/', 'email-generator/', 'username-generator/',
  'company-name-generator/', 'phone-number-generator/', 'random-state-generator/',
  'random-city-generator/', 'us-address/', 'states/', 'cities/', 'zip-codes/',
];

export const GET: APIRoute = async () => {
  const urls: string[] = [];

  for (const p of staticPages) {
    urls.push(`<url><loc>${SITE_URL}/${p}</loc></url>`);
  }

  for (const state of getStates()) {
    const slug = state.name.toLowerCase().replace(/\s+/g, '-');
    urls.push(`<url><loc>${SITE_URL}/states/${slug}/</loc></url>`);
  }

  for (const article of articles) {
    urls.push(`<url><loc>${SITE_URL}/blog/${article.slug}/</loc></url>`);
  }

  const cities = getCities();
  const zips = getZipcodes();
  const states = getStates();

  for (const state of states) {
    const stateSlug = state.name.toLowerCase().replace(/\s+/g, '-');
    const stateCities = cities.filter(c => c.state === state.name);
    const stateZips = zips.filter(z => z.state === state.name);

    for (const city of stateCities) {
      const citySlug = city.city.toLowerCase().replace(/\s+/g, '-');
      urls.push(`<url><loc>${SITE_URL}/${stateSlug}/${citySlug}/</loc></url>`);
    }

    for (const zip of stateZips) {
      urls.push(`<url><loc>${SITE_URL}/${stateSlug}/${zip.zip}/</loc></url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
