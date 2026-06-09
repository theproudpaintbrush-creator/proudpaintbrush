import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ServiceContent } from "@/lib/services";
import { buildServiceSchemas } from "@/lib/serviceSchema";
import { getReviewsForService, buildReviewSchema } from "@/lib/reviews";
import ServiceDetail from "@/components/ServiceDetail";

const BASE_URL = "https://www.theproudpaintbrush.com";
const DIR = path.join(process.cwd(), "content", "fence-cities");
const FENCE_PATH = "/exterior-painting/fence-staining";

type RouteParams = { city: string };

function getCity(slug: string): ServiceContent | null {
  const f = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(f)) return null;
  return JSON.parse(fs.readFileSync(f, "utf-8")) as ServiceContent;
}
function allSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
}

export function generateStaticParams(): RouteParams[] {
  return allSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  const url = `${BASE_URL}${FENCE_PATH}/${c.slug}`;
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: c.title, description: c.metaDescription, url, type: "website", ...(c.ogImage ? { images: [{ url: `${BASE_URL}${c.ogImage}` }] } : {}) },
    twitter: { card: "summary_large_image", title: c.title, description: c.metaDescription },
  };
}

export default async function FenceCityPage({ params }: { params: Promise<RouteParams> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  const related = allSlugs()
    .filter((s) => s !== c.slug)
    .map((s) => getCity(s))
    .filter((x): x is ServiceContent => !!x)
    .map((x) => ({ slug: `fence-staining/${x.slug}`, name: `${x.name} Fence Staining` }));
  const schemas = buildServiceSchemas(c, {
    areaServedCity: c.name,
    urlPath: `${FENCE_PATH}/${c.slug}`,
    breadcrumbParent: { name: "Fence Staining", path: FENCE_PATH },
  });
  const reviews = getReviewsForService("exterior", 3);
  const reviewSchema = buildReviewSchema(reviews);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      {reviewSchema.map((s, i) => (
        <script key={`rev-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ServiceDetail
        service={c}
        related={related}
        reviews={reviews}
        crossLinks={{
          heading: `More Painting Services in ${c.name}`,
          links: [
            { href: `/interior-painting/${c.slug}`, label: `Interior Painting in ${c.name}` },
            { href: `/exterior-painting/${c.slug}`, label: `Exterior Painting in ${c.name}` },
            { href: `/cabinet-painting/${c.slug}`, label: `Cabinet Painting in ${c.name}` },
            { href: `/service-areas/${c.slug}`, label: `All Services in ${c.name}` },
          ],
        }}
      />
    </>
  );
}
