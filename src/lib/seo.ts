export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  noindex?: boolean;
}

export const SITE_NAME = 'Random US Address Generator';
export const SITE_BRAND = 'RandomUSAddress.com';
export const SITE_URL = 'https://www.randomusaddress.com';
export const DEFAULT_DESCRIPTION = 'Generate random US addresses with names, cities, states, ZIP codes and phone numbers. Free random US address generator for testing and educational purposes.';
export const DEFAULT_KEYWORDS = 'random US address generator, fake address generator, US address generator, random person generator, fake US address, US phone number generator, random zip code generator, address generator USA, fake name generator, random address generator';
export const DEFAULT_TITLE = 'Random US Address Generator - Free Random US Address Generator';

export function buildTitle(title: string): string {
  return `${title} | RandomUSAddress.com`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'JavaScript',
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function getWebPageSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}

export function getAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    description: `Learn about ${SITE_NAME} — a free tool for generating random US addresses, names, phone numbers, and test data for developers and testers.`,
    url: `${SITE_URL}/about/`,
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}

export function getContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${SITE_NAME}`,
    description: `Contact ${SITE_NAME}. Have questions, suggestions, or feedback? We would love to hear from you.`,
    url: `${SITE_URL}/contact/`,
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };
}

export function calculateReadingTime(text: string): number {
  const wpm = 200;
  const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

interface FAQItem {
  question: string;
  answer: string;
}

export function getStateFAQs(stateName: string): FAQItem[] {
  return [
    { question: `What is a ${stateName} address generator?`, answer: `A ${stateName} address generator creates random but realistic addresses for ${stateName}, including street names, cities, ZIP codes, phone numbers, and emails.` },
    { question: `Are these real ${stateName} addresses?`, answer: `No, these ${stateName} addresses are randomly generated using realistic datasets. They are fictional and for testing or educational purposes only.` },
    { question: `Is this tool free to use?`, answer: `Yes, the ${stateName} address generator is completely free. No registration or account is required.` },
    { question: `What cities in ${stateName} are supported?`, answer: `Our generator includes hundreds of real cities across ${stateName}. Select a specific city to generate addresses for that location.` },
    { question: `What area code does ${stateName} use?`, answer: `Phone numbers generated for ${stateName} use real area codes. Each address includes a valid ${stateName} phone number format.` },
    { question: `What is included in each ${stateName} address?`, answer: `Each address includes a resident name, street address, city, state, ZIP code, phone number, and email address.` },
  ];
}

export function getCityFAQs(cityName: string, stateName: string): FAQItem[] {
  return [
    { question: `What is a ${cityName}, ${stateName} address generator?`, answer: `A ${cityName} address generator creates random but realistic addresses for ${cityName}, ${stateName}, including streets, ZIP codes, phone numbers, and emails.` },
    { question: `Are these real ${cityName} addresses?`, answer: `No, these ${cityName} addresses are randomly generated. They are fictional and for testing or educational purposes only.` },
    { question: `What ZIP codes does ${cityName} use?`, answer: `${cityName}, ${stateName} uses several ZIP codes. Our generator includes realistic ZIP codes for this city.` },
    { question: `Is this tool free?`, answer: `Yes, the ${cityName} address generator is completely free. No registration or account is required.` },
    { question: `What information is included in each address?`, answer: `Each address includes a resident name, street address, city, state, ZIP code, phone number, and email address.` },
    { question: `How does the ${cityName} address generator work?`, answer: `Our generator combines random street names, numbers, and ZIP codes from datasets relevant to ${cityName}, ${stateName}.` },
  ];
}

export function getZipFAQs(zip: string, cityName: string, stateName: string): FAQItem[] {
  return [
    { question: `What is ZIP code ${zip}?`, answer: `ZIP code ${zip} covers the ${cityName} area in ${stateName}. Our generator produces realistic addresses for this ZIP code.` },
    { question: `Where is ZIP code ${zip} located?`, answer: `ZIP code ${zip} is located in ${cityName}, ${stateName}. You can generate random addresses for this location.` },
    { question: `Are addresses for ZIP code ${zip} real?`, answer: `No, addresses generated for ZIP code ${zip} are randomly created and fictional. They are for testing purposes only.` },
    { question: `Is this tool free?`, answer: `Yes, our ZIP code address generator is completely free to use with no registration required.` },
    { question: `What information is included?`, answer: `Each address includes a resident name, street address, city, state, ZIP code ${zip}, phone number, and email address.` },
    { question: `How does the ZIP code generator work?`, answer: `Our generator combines random street names and numbers with ZIP code ${zip} to create realistic ${cityName} addresses.` },
  ];
}

export function getStateContent(stateName: string, cities: string[]): string[] {
  const cityList = cities.length > 5
    ? cities.slice(0, 5).join(', ') + `, and ${cities.length - 5} more`
    : cities.join(', ');
  return [
    `Our ${stateName} address generator creates random but realistic addresses for the state of ${stateName}. Each address includes a resident name, street address, city, state, ZIP code, phone number with a valid ${stateName} area code, and email address. All fields are internally consistent — the city belongs to ${stateName}, the ZIP code falls within valid ranges for the state, and the phone area code matches the state's telecommunications region.`,
    `Whether you need test data for software development, sample addresses for demonstrations, or random US addresses for educational projects, our ${stateName} generator provides unlimited addresses with one click. The generator covers cities across ${stateName} including ${cityList}. Each address is freshly generated and unique every time you click generate.`,
    `Using fictional addresses protects privacy and ensures compliance with data protection regulations. No real personal information is used or stored. The addresses are generated algorithmically from datasets of real street names, ${stateName} cities, and valid ZIP code patterns, producing results that look authentic while remaining completely fictional.`,
  ];
}

export function getCityContent(cityName: string, stateName: string, zipCount: number): string[] {
  return [
    `Our ${cityName}, ${stateName} address generator creates random but realistic addresses for the city of ${cityName}. Each address includes a resident name, street address, ${cityName} city designation, ${stateName} state, ZIP code, phone number, and email address. All data is consistent — the city matches ${stateName}, the ZIP code is valid for ${cityName}, and the phone area code corresponds to the state.`,
    `Use our ${cityName} address generator for software testing, form validation, demo data population, and educational projects. The generator produces unique addresses with ${zipCount > 1 ? 'multiple ZIP codes including ' + cityName + ' area codes' : 'the local ZIP code and area code'} every time you click generate. No registration or account is needed.`,
    `All addresses are randomly generated and completely fictional. They are designed for testing and development purposes only and should not be used for shipping, legal documents, or any official use. Our generator ensures that no real personal data is exposed while providing realistic-looking test data.`,
  ];
}

export function getZipContent(zip: string, cityName: string, stateName: string): string[] {
  return [
    `ZIP code ${zip} serves the ${cityName} area in ${stateName}. Our address generator for ZIP code ${zip} creates random but realistic addresses with resident names, street addresses, the correct city of ${cityName}, state of ${stateName}, and phone numbers with valid area codes. Each generated address is fresh and unique.`,
    `Use our generator for ZIP code ${zip} to produce test data for software development, validate address forms, populate demo databases, or create sample addresses for ${cityName}, ${stateName}. The generator produces consistent results where the ZIP code, city, and state all match correctly.`,
    `All addresses for ZIP code ${zip} are randomly generated and fictional. They are intended for testing and educational purposes only. No real personal data is used, stored, or exposed. This makes our generator compliant with privacy best practices and data protection regulations.`,
  ];
}
