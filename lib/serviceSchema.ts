import type { ServiceContent, ServiceParent } from "@/lib/services";

const BASE_URL = "https://www.theproudpaintbrush.com";
const PHONE_TEL = "+18326050493";

const PARENT_LABEL: Record<ServiceParent, string> = {
  interior: "Interior Painting",
  exterior: "Exterior Painting",
  cabinet: "Cabinet Painting",
};
const PARENT_PATH: Record<ServiceParent, string> = {
  interior: "/interior-painting",
  exterior: "/exterior-painting",
  cabinet: "/cabinet-painting",
};

// Builds the JSON-LD graph for a service detail page:
// LocalBusiness (+aggregateRating), Service, optional FAQPage, BreadcrumbList.
export function buildServiceSchemas(service: ServiceContent, opts?: { areaServedCity?: string }) {
  const parentPath = PARENT_PATH[service.parent];
  const parentLabel = PARENT_LABEL[service.parent];
  const url = `${BASE_URL}${parentPath}/${service.slug}`;
  const areaCity = opts?.areaServedCity ?? "Sugar Land";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: "The Proud Paintbrush",
    image: service.ogImage || `${BASE_URL}/images/logo.png`,
    url,
    telephone: PHONE_TEL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sugar Land",
      addressRegion: "TX",
      postalCode: "77498",
      addressCountry: "US",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: 113 },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: parentLabel,
    provider: { "@id": `${url}#localbusiness` },
    areaServed: { "@type": "City", name: areaCity, address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" } },
    description: service.metaDescription,
  };

  const faqSchema = service.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: parentLabel, item: `${BASE_URL}${parentPath}` },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  };

  return [localBusiness, serviceSchema, faqSchema, breadcrumb].filter(Boolean);
}

// JSON-LD for a service HUB page: LocalBusiness, Service, FAQPage (optional),
// BreadcrumbList, and an ItemList of the sub-services it links to.
export function buildHubSchemas(
  parent: ServiceParent,
  title: string,
  metaDescription: string,
  faqs: { q: string; a: string }[],
  subServices: { slug: string; name: string }[]
) {
  const parentLabel = PARENT_LABEL[parent];
  const parentPath = PARENT_PATH[parent];
  const url = `${BASE_URL}${parentPath}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: "The Proud Paintbrush",
    url,
    telephone: PHONE_TEL,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressLocality: "Sugar Land", addressRegion: "TX", postalCode: "77498", addressCountry: "US" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: 113 },
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: parentLabel,
    serviceType: parentLabel,
    provider: { "@id": `${url}#localbusiness` },
    areaServed: { "@type": "City", name: "Sugar Land", address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" } },
    description: metaDescription,
  };
  const itemList = subServices.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: subServices.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: `${url}/${s.slug}`,
        })),
      }
    : null;
  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: parentLabel, item: url },
    ],
  };
  return [localBusiness, serviceSchema, itemList, faqSchema, breadcrumb].filter(Boolean);
}
