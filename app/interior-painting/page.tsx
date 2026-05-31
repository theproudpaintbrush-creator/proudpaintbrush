import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES } from "@/lib/cities";
import { getHub, getServicesByParent } from "@/lib/services";
import { getAllPosts } from "@/lib/blog";
import { buildHubSchemas } from "@/lib/serviceSchema";
import ServiceHub from "@/components/ServiceHub";

const TOPIC = /interior|wall|ceiling|trim|bedroom|living|nursery|drywall|color|sheen|undertone|\broom\b/i;

const BASE_URL = "https://www.theproudpaintbrush.com";

export function generateMetadata(): Metadata {
  const hub = getHub("interior");
  if (!hub) return {};
  const url = `${BASE_URL}/interior-painting`;
  return {
    title: hub.title,
    description: hub.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: hub.title, description: hub.metaDescription, url, type: "website", images: [{ url: `${BASE_URL}${hub.heroImage}` }] },
    twitter: { card: "summary_large_image", title: hub.title, description: hub.metaDescription, images: [`${BASE_URL}${hub.heroImage}`] },
  };
}

export default function InteriorPaintingHub() {
  const hub = getHub("interior");
  if (!hub) notFound();
  const subServices = getServicesByParent("interior").map((s) => ({ slug: s.slug, name: s.name }));
  const cities = CITIES.map((c) => ({ slug: c.slug, name: c.name }));
  const relatedPosts = getAllPosts().filter((p) => TOPIC.test(`${p.title} ${p.slug}`)).slice(0, 3).map((p) => ({ slug: p.slug, title: p.title }));
  const schemas = buildHubSchemas("interior", hub.title, hub.metaDescription, hub.faqs, subServices);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ServiceHub hub={hub} subServices={subServices} cities={cities} relatedPosts={relatedPosts} />
    </>
  );
}
