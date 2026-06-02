import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts, getAllSlugs } from "@/lib/blog";
import { imageDims } from "@/lib/imageDims";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const AUTHOR_BIOS: Record<string, { initials: string; bio: string }> = {
  "Chris Petkau": {
    initials: "CP",
    bio: "Chris Petkau is the founder of The Proud Paintbrush, a locally owned painting company serving Sugar Land and Fort Bend County since 2020. He writes about prep-first workmanship, durable finishes, and getting a paint job that actually lasts.",
  },
  "Aliza Momin": {
    initials: "AM",
    bio: "Aliza Momin writes for The Proud Paintbrush on interior color, design trends, and helping Fort Bend County homeowners get the most out of their painting projects.",
  },
};
const DEFAULT_BIO = {
  initials: "PP",
  bio: "The Proud Paintbrush is Fort Bend County's trusted painting contractor — serving Sugar Land, Richmond, Katy, and surrounding communities with residential and commercial painting.",
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogImage = `https://www.theproudpaintbrush.com${post.image || "/images/hero-stucco-richmond.webp"}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://www.theproudpaintbrush.com/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | The Proud Paintbrush`,
      description: post.description,
      url: `https://www.theproudpaintbrush.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: ogImage }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [ogImage] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  // topically-relevant related posts (shared significant title words), newest as tiebreak
  const STOP = new Set(["the","a","an","to","of","in","on","for","and","or","is","are","your","you","how","what","why","with","do","does","should","it","this","that","be","paint","painting","painters","painter"]);
  const words = (s: string) =>
    new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 3 && !STOP.has(w)));
  const myWords = words(`${post.title} ${slug}`);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: [...words(p.title)].filter((w) => myWords.has(w)).length }))
    .sort((a, b) => b.score - a.score || new Date(b.p.date).getTime() - new Date(a.p.date).getTime())
    .slice(0, 3)
    .map((x) => x.p);

  // contextual service spotlight based on the post topic
  const t = `${slug} ${post.title}`.toLowerCase();
  const spotlight =
    /cabinet|kitchen/.test(t) ? { href: "/cabinet-painting", label: "Cabinet Painting" }
    : /exterior|stucco|fence|deck|brick|siding|hoa|curb|hurricane/.test(t) ? { href: "/exterior-painting", label: "Exterior Painting" }
    : /color|undertone|sheen|hue|palette|psycholog/.test(t) ? { href: "/color-consultation", label: "Color Consultation" }
    : /cost|price|pay|quote|budget|charge|worth|finance/.test(t) ? { href: "/pricing", label: "Painting Prices" }
    : /interior|wall|ceiling|trim|bedroom|living|drywall|nursery|office/.test(t) ? { href: "/interior-painting", label: "Interior Painting" }
    : { href: "/contact", label: "a Free Estimate" };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: AUTHOR_BIOS[post.author]
      ? {
          "@type": "Person",
          name: post.author,
          description: AUTHOR_BIOS[post.author].bio,
          url: "https://www.theproudpaintbrush.com/blog",
        }
      : {
          "@type": "Organization",
          name: post.author,
          url: "https://www.theproudpaintbrush.com",
        },
    publisher: {
      "@type": "Organization",
      name: "The Proud Paintbrush",
      url: "https://www.theproudpaintbrush.com",
      logo: {
        "@type": "ImageObject",
        url: "https://images.squarespace-cdn.com/content/v1/6245121c345d9b583ef8e7b7/8ab85515-fa22-4454-a968-a8b8add58e5b/Logo-06-1+png.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    url: `https://www.theproudpaintbrush.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.theproudpaintbrush.com/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.theproudpaintbrush.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.theproudpaintbrush.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.theproudpaintbrush.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#1a2e44] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link
              href="/blog"
              className="text-[#4B83B2] hover:underline text-sm font-medium"
            >
              &larr; Back to Blog
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <span>By {post.author}</span>
            <span>&bull;</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>&bull;</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </section>

      {/* Feature image */}
      {post.image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            {...(() => { const d = imageDims(post.image); return d ? { width: d.w, height: d.h } : {}; })()}
            className="w-full h-auto rounded-xl shadow-md object-cover max-h-[460px]"
          />
        </div>
      )}

      {/* Article body */}
      <article className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none text-gray-700
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a2e44] [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#1a2e44] [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul_li]:mb-1
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol_li]:mb-1
              [&_strong]:text-[#1a2e44] [&_strong]:font-semibold
              [&_a]:text-[#4B83B2] [&_a]:font-medium [&_a:hover]:underline
              [&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_img]:h-auto [&_img]:shadow-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Contextual service spotlight */}
      <section className="py-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#4B83B2] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-1">Thinking about a project?</p>
              <p className="text-lg font-bold">
                See our {spotlight.label}{spotlight.href === "/contact" ? "" : " services"} — or get a free, no-pressure estimate.
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-3">
              <Link href={spotlight.href} className="bg-white text-[#4B83B2] hover:bg-[#1a2e44] hover:text-white font-semibold px-5 py-3 rounded-lg transition-colors whitespace-nowrap">
                {spotlight.href === "/contact" ? "Free Estimate" : spotlight.label}
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-5 py-3 rounded-lg transition-colors whitespace-nowrap">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Author bio */}
      <section className="bg-[#f8f9fa] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-[#4B83B2] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {(AUTHOR_BIOS[post.author] || DEFAULT_BIO).initials}
            </div>
            <div>
              <p className="font-bold text-[#1a2e44]">{post.author}</p>
              <p className="text-sm text-gray-600 mt-1">
                {(AUTHOR_BIOS[post.author] || DEFAULT_BIO).bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a2e44] mb-8">
              More From The Blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="bg-[#f8f9fa] rounded-xl p-6 hover:shadow-sm transition-shadow"
                >
                  <div className="text-xs text-gray-500 mb-2">
                    <time dateTime={related.date}>
                      {new Date(related.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    {" · "}
                    {related.readTime} min read
                  </div>
                  <h3 className="font-bold text-[#1a2e44] mb-2 leading-tight">
                    <Link
                      href={`/blog/${related.slug}`}
                      className="hover:text-[#4B83B2] transition-colors"
                    >
                      {related.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {related.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#1a2e44] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Start Your Painting Project?
          </h2>
          <p className="text-gray-300 mb-6">
            Get a free estimate from Sugar Land&apos;s top-rated painting
            contractor.
          </p>
          <a
            href="https://theproudpaintbrush.youcanbook.me"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#4B83B2] hover:bg-[#3a6a96] text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Schedule Free Estimate
          </a>
        </div>
      </section>
    </>
  );
}
