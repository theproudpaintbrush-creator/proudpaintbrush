import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES } from "@/lib/cities";
import { getHub } from "@/lib/services";
import { buildHubSchemas } from "@/lib/serviceSchema";
import ServiceHub from "@/components/ServiceHub";

const BASE_URL = "https://www.theproudpaintbrush.com";

export function generateMetadata(): Metadata {
  const hub = getHub("cabinet");
  if (!hub) return {};
  const url = `${BASE_URL}/cabinet-painting`;
  return {
    title: hub.title,
    description: hub.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: hub.title, description: hub.metaDescription, url, type: "website", images: [{ url: `${BASE_URL}${hub.heroImage}` }] },
    twitter: { card: "summary_large_image", title: hub.title, description: hub.metaDescription, images: [`${BASE_URL}${hub.heroImage}`] },
  };
}

export default function CabinetPaintingHub() {
  const hub = getHub("cabinet");
  if (!hub) notFound();
  // Cabinet has no sub-service spokes, but now has per-city pages to link to.
  const cities = CITIES.map((c) => ({ slug: c.slug, name: c.name }));
  const schemas = buildHubSchemas("cabinet", hub.title, hub.metaDescription, hub.faqs, []);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ServiceHub hub={hub} subServices={[]} cities={cities} />
    </>
  );
}
