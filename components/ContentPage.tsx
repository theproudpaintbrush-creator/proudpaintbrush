import Link from "next/link";
import type { PageContent } from "@/lib/pages";

const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";
const PHONE = "(832) 605-0493";
const PHONE_TEL = "+18326050493";

function titleCase(seg: string) {
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ContentPage({ page }: { page: PageContent }) {
  const segs = page.key.split("/");
  const crumbs = segs.map((s, i) => ({ label: titleCase(s), href: "/" + segs.slice(0, i + 1).join("/") }));

  return (
    <>
      {/* HERO */}
      <section className="bg-[#1a2e44] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-white/60 tracking-wide">
            <Link href="/" className="hover:text-white">Home</Link>
            {crumbs.map((c, i) => (
              <span key={c.href}>
                <span className="mx-2">/</span>
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{page.h1}</h1>
        </div>
      </section>

      {/* BODY */}
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
              [&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_img]:shadow-sm
              [&_table]:w-full [&_table]:my-6 [&_table]:text-sm [&_th]:bg-gray-100 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-gray-200 [&_td]:p-2 [&_th]:border [&_th]:border-gray-200"
            dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
          />
        </div>
      </article>

      {/* GALLERY (portfolio) */}
      {page.gallery && page.gallery.length > 0 && (
        <section className="bg-white pb-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {page.gallery.map((img, i) => (
                <figure key={`${img.src}-${i}`} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {page.faqs.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {page.faqs.map((f) => (
                <div key={f.q} className="bg-white border border-gray-200 p-6">
                  <h3 className="font-bold text-[#1a2e44] mb-2 text-lg">{f.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#4B83B2] text-white py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8">Get a free, no-pressure estimate from Sugar Land&apos;s top-rated, locally owned painting company.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#4B83B2] hover:bg-[#1a2e44] hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">Request a Free Estimate</a>
            <a href={`tel:${PHONE_TEL}`} className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-8 py-3 rounded-lg transition-colors">Call {PHONE}</a>
          </div>
        </div>
      </section>
    </>
  );
}
