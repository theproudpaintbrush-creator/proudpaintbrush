import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getAllPageKeys } from "@/lib/pages";
import { getReviewsForPage, buildReviewSchema } from "@/lib/reviews";
import ContentPage from "@/components/ContentPage";

const BASE_URL = "https://www.theproudpaintbrush.com";

type RouteParams = { slug: string[] };

export function generateStaticParams(): RouteParams[] {
  return getAllPageKeys().map((key) => ({ slug: key.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) return {};
  const url = `${BASE_URL}/${page.key}`;
  const ogPath = (page.bodyHtml.match(/<img src="([^"]+)"/) || [])[1] || page.gallery?.[0]?.src || "/images/hero-stucco-richmond.webp";
  // Guard against already-absolute image URLs (e.g. squarespace-cdn) so we don't
  // produce a malformed "https://site.com/https://..." OG image URL.
  const ogImage = /^https?:\/\//.test(ogPath) ? ogPath : `${BASE_URL}${ogPath}`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: page.title, description: page.metaDescription, url, type: "website", images: [{ url: ogImage }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.metaDescription, images: [ogImage] },
  };
}

export default async function CatchAllContentPage({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = getPage(key);
  if (!page) notFound();

  const url = `${BASE_URL}/${page.key}`;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.metaDescription,
    url,
  };
  const segs = page.key.split("/");
  const titleCase = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ...segs.map((s, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: titleCase(s),
        item: `${BASE_URL}/${segs.slice(0, i + 1).join("/")}`,
      })),
    ],
  };
  const faqSchema = page.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;
  // Real customer reviews tied to the global business entity (opt-in via page.reviews)
  const reviewSchema = page.reviews ? buildReviewSchema(getReviewsForPage(page.reviews)) : [];
  // Service structured data (opt-in via page.serviceSchema) so service-style
  // pages rank as a Service with provider, areaServed, and rating.
  const serviceSchema = page.serviceSchema
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.serviceSchema.name,
        ...(page.serviceSchema.serviceType ? { serviceType: page.serviceSchema.serviceType } : {}),
        provider: { "@id": `${BASE_URL}/#business` },
        url,
        ...(page.serviceSchema.areaServed?.length
          ? { areaServed: page.serviceSchema.areaServed.map((name) => ({ "@type": "City", name })) }
          : {}),
        // No aggregateRating here: schema.org/Service is not a Google-supported
        // review-snippet type (it triggers "Invalid object type for field
        // '<parent_node>'"). The rating lives on the LocalBusiness node in layout.tsx.
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {serviceSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />}
      {reviewSchema.map((s, i) => (
        <script key={`rev-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ContentPage page={page} />
    </>
  );
}
