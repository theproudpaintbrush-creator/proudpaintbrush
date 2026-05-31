import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES } from "@/lib/cities";
import { getHub, getServicesByParent } from "@/lib/services";
import { buildHubSchemas } from "@/lib/serviceSchema";
import ServiceHub from "@/components/ServiceHub";

const BASE_URL = "https://www.theproudpaintbrush.com";

export function generateMetadata(): Metadata {
  const hub = getHub("exterior");
  if (!hub) return {};
  const url = `${BASE_URL}/exterior-painting`;
  return {
    title: hub.title,
    description: hub.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: hub.title, description: hub.metaDescription, url, type: "website", images: [{ url: `${BASE_URL}${hub.heroImage}` }] },
    twitter: { card: "summary_large_image", title: hub.title, description: hub.metaDescription, images: [`${BASE_URL}${hub.heroImage}`] },
  };
}

export default function ExteriorPaintingHub() {
  const hub = getHub("exterior");
  if (!hub) notFound();
  const subServices = getServicesByParent("exterior").map((s) => ({ slug: s.slug, name: s.name }));
  const cities = CITIES.map((c) => ({ slug: c.slug, name: c.name }));
  const schemas = buildHubSchemas("exterior", hub.title, hub.metaDescription, hub.faqs, subServices);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ServiceHub hub={hub} subServices={subServices} cities={cities} />
    </>
  );
}
