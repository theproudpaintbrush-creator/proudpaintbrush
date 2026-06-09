import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Painting Tips & Advice Blog",
  description:
    "Painting tips, color advice, and home improvement insights from The Proud Paintbrush — Sugar Land's trusted painting contractor.",
  alternates: { canonical: "https://www.theproudpaintbrush.com/blog" },
  openGraph: {
    title: "Painting Tips & Advice Blog | The Proud Paintbrush",
    description:
      "Painting tips, color advice, and home improvement insights from The Proud Paintbrush — Sugar Land's trusted painting contractor.",
    url: "https://www.theproudpaintbrush.com/blog",
    type: "website",
    images: [{ url: "https://www.theproudpaintbrush.com/images/hero-stucco-richmond.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Painting Tips & Advice Blog | The Proud Paintbrush",
    description:
      "Painting tips, color advice, and home improvement insights from Sugar Land's trusted painting contractor.",
    images: ["https://www.theproudpaintbrush.com/images/hero-stucco-richmond.webp"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a2e44] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Painting Tips, Advice &amp; Resources
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Expert insights from The Proud Paintbrush team — your Fort Bend
            County painting specialists.
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="bg-[#f8f9fa] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Blog posts coming soon! Check back for painting tips, color
                advice, and local home improvement resources.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  <Link href={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100">
                    {post.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                    )}
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
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
                    <h2 className="text-lg font-bold text-[#1a2e44] mb-2 leading-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-[#4B83B2] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#4B83B2] font-semibold text-sm hover:underline"
                    >
                      Read more &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

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
