import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { SITE_URL, BOOKING_URL } from "@/lib/site";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `${SITE_URL}/projects/${project.slug}`;
  const ogImage = `${SITE_URL}${project.photos[project.photos.length - 1]?.src || project.photos[0].src}`;
  return {
    title: project.title,
    description: project.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description: project.metaDescription,
      url,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.metaDescription, images: [ogImage] },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const url = `${SITE_URL}/projects/${project.slug}`;

  // CreativeWork describes the project; associatedMedia carries an ImageObject
  // for every photo so each image is a first-class entity for search.
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.h1,
    description: project.metaDescription,
    url,
    dateCreated: project.date,
    creator: { "@id": `${SITE_URL}/#business` },
    locationCreated: { "@type": "Place", name: project.city },
    about: project.services,
    material: project.products,
    associatedMedia: project.photos.map((ph) => ({
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${ph.src}`,
      caption: ph.caption || ph.alt,
      description: ph.alt,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: project.h1, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="bg-white">
        <header className="bg-[#1a2e44] text-white py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-white/60 tracking-wide uppercase">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/projects" className="hover:text-white">Projects</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{project.neighborhood}</span>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7fb0d8] mb-2">
              {project.neighborhood} · Completed {project.completed}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold">{project.h1}</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* META */}
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 border-b border-gray-200 pb-10">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Location</dt>
              <dd className="text-[#111111]">{project.city}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Services</dt>
              <dd className="text-[#111111]">{project.services.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Products</dt>
              <dd className="text-[#111111]">{project.products.join(", ")}</dd>
            </div>
          </dl>

          {/* NARRATIVE */}
          <div className="prose max-w-none mb-12">
            {project.narrative.map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-5 text-lg">{p}</p>
            ))}
          </div>

          {/* PHOTOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {project.photos.map((ph) => (
              <figure key={ph.src} className="m-0">
                <div className="relative w-full h-64 overflow-hidden rounded-lg">
                  <Image
                    src={ph.src}
                    alt={ph.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </div>
                {ph.caption && <figcaption className="text-sm text-gray-500 mt-2">{ph.caption}</figcaption>}
              </figure>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#eef1f5] rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#1a2e44] mb-3">Want results like this for your home?</h2>
            <p className="text-gray-600 mb-6">Free 30&ndash;40 minute on-site estimate. No pressure.</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#4B83B2] text-white hover:bg-[#1a2e44] font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Schedule Your Free Estimate &rarr;
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
