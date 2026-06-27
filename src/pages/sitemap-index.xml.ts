import type { APIRoute } from 'astro';
import { getStates, getCities, getZipcodes, getCounties, getAreaCodes } from '../lib/generator';
import { SITE_URL, slugify } from '../lib/seo';
import { articles } from '../lib/blog';

const staticPages: { path: string; priority: string; changefreq: string }[] = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'about/', priority: '0.5', changefreq: 'monthly' },
  { path: 'contact/', priority: '0.5', changefreq: 'monthly' },
  { path: 'privacy-policy/', priority: '0.4', changefreq: 'monthly' },
  { path: 'terms/', priority: '0.4', changefreq: 'monthly' },
  { path: 'cookie-policy/', priority: '0.4', changefreq: 'monthly' },
  { path: 'disclaimer/', priority: '0.4', changefreq: 'monthly' },
  { path: 'dmca/', priority: '0.4', changefreq: 'monthly' },
  { path: 'all-tools/', priority: '0.7', changefreq: 'weekly' },
  { path: 'blog/', priority: '0.8', changefreq: 'weekly' },
  { path: 'random-address-generator/', priority: '0.9', changefreq: 'weekly' },
  { path: 'us-address-generator/', priority: '0.9', changefreq: 'weekly' },
  { path: 'street-address-generator/', priority: '0.8', changefreq: 'weekly' },
  { path: 'random-person-generator/', priority: '0.8', changefreq: 'weekly' },
  { path: 'name-generator/', priority: '0.7', changefreq: 'weekly' },
  { path: 'email-generator/', priority: '0.7', changefreq: 'weekly' },
  { path: 'username-generator/', priority: '0.7', changefreq: 'weekly' },
  { path: 'company-name-generator/', priority: '0.7', changefreq: 'weekly' },
  { path: 'phone-number-generator/', priority: '0.7', changefreq: 'weekly' },
  { path: 'random-state-generator/', priority: '0.7', changefreq: 'weekly' },
  { path: 'random-city-generator/', priority: '0.7', changefreq: 'weekly' },
  { path: 'ip-address-generator/', priority: '0.7', changefreq: 'weekly' },
  { path: 'us-address/', priority: '0.8', changefreq: 'weekly' },
];

function url(loc: string, priority: string, changefreq: string): string {
  return `<url><loc>${SITE_URL}/${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export const GET: APIRoute = async () => {
  const urls: string[] = [];

  for (const p of staticPages) {
    urls.push(url(p.path, p.priority, p.changefreq));
  }

  const states = getStates();
  const cities = getCities();
  const zips = getZipcodes();
  const counties = getCounties();
  const areaCodes = getAreaCodes();

  // Index pages
  urls.push(url('states/', '0.8', 'weekly'));
  urls.push(url('cities/', '0.8', 'weekly'));
  urls.push(url('zip-codes/', '0.8', 'weekly'));
  urls.push(url('counties/', '0.8', 'weekly'));
  urls.push(url('area-codes/', '0.8', 'weekly'));

  // /cities/{city}/ (global dedup)
  const globalCitySeen = new Set<string>();
  for (const city of cities) {
    const citySlug = slugify(city.city);
    if (!globalCitySeen.has(citySlug)) {
      globalCitySeen.add(citySlug);
      urls.push(url(`cities/${citySlug}/`, '0.7', 'weekly'));
    }
  }

  // Individual state pages
  for (const state of states) {
    const stateSlug = slugify(state.name);

    // /states/{state}/
    urls.push(url(`states/${stateSlug}/`, '0.8', 'weekly'));

    // /{state}/ (state root)
    urls.push(url(`${stateSlug}/`, '0.7', 'weekly'));

    // /{state}/{city}/
    const stateCities = cities.filter(c => c.state === state.name);
    const stateCitySeen = new Set<string>();
    for (const city of stateCities) {
      const citySlug = slugify(city.city);
      const key = `${stateSlug}/${citySlug}`;
      if (!stateCitySeen.has(key)) {
        stateCitySeen.add(key);
        urls.push(url(`${stateSlug}/${citySlug}/`, '0.7', 'weekly'));
      }
    }

    // /zip-codes/{zip}/
    const stateZips = zips.filter(z => z.state === state.name);
    for (const zip of stateZips) {
      urls.push(url(`zip-codes/${zip.zip}/`, '0.6', 'weekly'));
    }

    // /{state}/{zip}/
    for (const zip of stateZips) {
      urls.push(url(`${stateSlug}/${zip.zip}/`, '0.6', 'weekly'));
    }

    // /{state}/{county}-county/
    const stateCounties = counties.filter(c => c.state === state.name);
    const countySeen = new Set<string>();
    for (const co of stateCounties) {
      const countySlug = slugify(co.name) + '-county';
      const key = `${stateSlug}/${countySlug}`;
      if (!countySeen.has(key)) {
        countySeen.add(key);
        urls.push(url(`${stateSlug}/${countySlug}/`, '0.6', 'weekly'));
      }
    }
  }

  // /counties/{county}/ (global dedup)
  const globalCountySeen = new Set<string>();
  for (const co of counties) {
    const countySlug = slugify(co.name);
    if (!globalCountySeen.has(countySlug)) {
      globalCountySeen.add(countySlug);
      urls.push(url(`counties/${countySlug}/`, '0.6', 'weekly'));
    }
  }

  // /area-codes/{code}/
  const seenAreas = new Set<string>();
  for (const [, codes] of Object.entries(areaCodes)) {
    for (const code of codes) {
      if (!seenAreas.has(code)) {
        seenAreas.add(code);
        urls.push(url(`area-codes/${code}/`, '0.6', 'weekly'));
      }
    }
  }

  // Blog articles
  for (const article of articles) {
    urls.push(url(`blog/${article.slug}/`, '0.6', 'monthly'));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
