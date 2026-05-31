import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getAllPageKeys } from "@/lib/pages";
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
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: page.title, description: page.metaDescription, url, type: "website" },
    twitter: { card: "summary_large_image", title: page.title, description: page.metaDescription },
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
  const faqSchema = page.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <ContentPage page={page} />
    </>
  );
}
