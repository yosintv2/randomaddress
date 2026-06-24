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
export const DEFAULT_DESCRIPTION = 'Generate random US addresses with names, cities, states, ZIP codes and phone numbers. Free random address generator for testing and educational purposes.';
export const DEFAULT_TITLE = 'Random US Address Generator (Free Random Address Generator)';

export function buildTitle(title: string): string {
  return `${title} | Random US Address Generator`;
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
