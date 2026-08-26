const BASE_URL = "https://www.theproudpaintbrush.com";

// Single-purpose BreadcrumbList emitter for simple, single-level pages
// (testimonials, contact, our-story, etc.) that don't already build their own
// breadcrumb JSON-LD inline. `items` are the crumbs after Home, in order.
export default function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        item: `${BASE_URL}${it.path}`,
      })),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
