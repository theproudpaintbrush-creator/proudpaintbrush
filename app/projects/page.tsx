import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recent Projects | The Proud Paintbrush Sugar Land",
  description:
    "Before-and-after painting projects across Sugar Land, West Houston & Fort Bend County — neighborhoods, scope, products, and photos from real homes.",
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: "Recent Projects | The Proud Paintbrush",
    description:
      "Before-and-after painting projects across Sugar Land, West Houston & Fort Bend County.",
    url: `${SITE_URL}/projects`,
    type: "website",
  },
};

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.h1,
      url: `${SITE_URL}/projects/${p.slug}`,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-[#1a2e44] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-white/60 tracking-wide uppercase">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Projects</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Recent Projects</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Real homes across Sugar Land, West Houston, and Fort Bend County — the scope, the products, and the
            before-and-after of each job.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group flex flex-col border border-gray-200 hover:border-[#4B83B2] transition-colors overflow-hidden rounded-lg">
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={p.photos[p.photos.length - 1]?.src || p.photos[0].src}
                  alt={p.photos[p.photos.length - 1]?.alt || p.photos[0].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4B83B2] mb-2">
                  {p.neighborhood} · {p.completed}
                </p>
                <h2 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#4B83B2] transition-colors">{p.h1}</h2>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{p.narrative[0]}</p>
                <span className="mt-4 text-sm font-semibold text-[#4B83B2]">View project &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
