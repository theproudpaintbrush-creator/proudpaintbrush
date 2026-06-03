import type { ServiceContent, ServiceParent } from "@/lib/services";

const BASE_URL = "https://www.theproudpaintbrush.com";
const BUSINESS_ID = `${BASE_URL}/#business`;

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
export function buildServiceSchemas(
  service: ServiceContent,
  opts?: {
    areaServedCity?: string;
    // Override the canonical path (default `${parentPath}/${slug}`). Used by
    // nested pages like fence-staining city pages at /exterior-painting/fence-staining/<city>.
    urlPath?: string;
    // Insert an extra breadcrumb level between the parent hub and this page
    // (e.g. "Fence Staining" → /exterior-painting/fence-staining).
    breadcrumbParent?: { name: string; path: string };
  }
) {
  const parentPath = PARENT_PATH[service.parent];
  const parentLabel = PARENT_LABEL[service.parent];
  const url = opts?.urlPath ? `${BASE_URL}${opts.urlPath}` : `${BASE_URL}${parentPath}/${service.slug}`;
  const areaCity = opts?.areaServedCity ?? "Sugar Land";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: parentLabel,
    provider: { "@id": BUSINESS_ID },
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

  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: parentLabel, item: `${BASE_URL}${parentPath}` },
  ];
  if (opts?.breadcrumbParent) {
    crumbs.push({ "@type": "ListItem", position: 3, name: opts.breadcrumbParent.name, item: `${BASE_URL}${opts.breadcrumbParent.path}` });
  }
  crumbs.push({ "@type": "ListItem", position: crumbs.length + 1, name: service.name, item: url });
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs,
  };

  return [serviceSchema, faqSchema, breadcrumb].filter(Boolean);
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: parentLabel,
    serviceType: parentLabel,
    provider: { "@id": BUSINESS_ID },
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
  return [serviceSchema, itemList, faqSchema, breadcrumb].filter(Boolean);
}
