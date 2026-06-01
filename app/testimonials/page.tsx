import type { Metadata } from "next";
import Link from "next/link";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import VideoTestimonial, { AuthenticVideoGrid } from "@/components/VideoTestimonial";

const BASE_URL = "https://www.theproudpaintbrush.com";
const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";
const PHONE = "(832) 605-0493";
const PHONE_TEL = "+18326050493";

// Real Google review count as of 2026-06-01 (5.0★). Update when it grows.
const AGGREGATE_RATING = { value: "5.0", count: 113 };

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials",
  description:
    "See why Sugar Land & Fort Bend County homeowners trust The Proud Paintbrush. Real video reviews, photos & 5-star testimonials. Get your free estimate today.",
  alternates: { canonical: `${BASE_URL}/testimonials` },
  openGraph: {
    title: "Customer Reviews & Testimonials | The Proud Paintbrush",
    description:
      "Real video reviews, customer photos, and 5-star testimonials from Sugar Land & Fort Bend County homeowners.",
    url: `${BASE_URL}/testimonials`,
    images: [
      {
        url: `${BASE_URL}/images/happy-customers-the-proud-paintbrush-sugar-land-tx.jpg`,
        width: 1200,
        height: 630,
        alt: "Happy customers of The Proud Paintbrush in Sugar Land, TX",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews & Testimonials | The Proud Paintbrush",
    description:
      "Real video reviews, customer photos, and 5-star testimonials from Sugar Land & Fort Bend County homeowners.",
    images: [`${BASE_URL}/images/happy-customers-the-proud-paintbrush-sugar-land-tx.jpg`],
  },
};

// Real customer video testimonials (scraped from the live site + existing).
// Featured (Teppers) is shown separately above. Named customers labeled where known.
const authenticVideos = [
  { youtubeId: "4K_j8zfo2zQ", customerNeighborhood: "The Olsons" },
  { youtubeId: "gxB9xw9m34U", customerNeighborhood: "The Lopezs" },
  { youtubeId: "LNmUGCgmTS0", customerNeighborhood: "Avan" },
  { youtubeId: "sbTOOc-S7nE", customerNeighborhood: "Edwin" },
  { youtubeId: "W96cOO6v1LA", customerNeighborhood: "Mei" },
  { youtubeId: "zT_z3yxJcL0", customerNeighborhood: "Karmyn" },
  { youtubeId: "bzbgrgyHxow", customerNeighborhood: "Clemment" },
  { youtubeId: "E_GicxQ676A", customerNeighborhood: "Mrs. Phillips" },
  { youtubeId: "shzynACJsEw", customerNeighborhood: "Kerry" },
  { youtubeId: "3rIAxmF9ow0" },
  { youtubeId: "5rhZR2sQC2g" },
  { youtubeId: "AnJpFabDhOw" },
  { youtubeId: "gY1VnnU308o" },
  { youtubeId: "jF9-nlPZAYE" },
  { youtubeId: "SItjnyqD0o8" },
  { youtubeId: "tLfUJtXRwss" },
  { youtubeId: "XHhGMUESFL8" },
  { youtubeId: "yrbeE2EwCcA" },
  { youtubeId: "6P4_4GHaYP8" },
  { youtubeId: "a20JwINRrNc" },
  { youtubeId: "B3mAxVXwDoM" },
  { youtubeId: "-bnDu_8HApE" },
  { youtubeId: "dzUzGhht6F8" },
  { youtubeId: "gN2iVF5ig_8" },
  { youtubeId: "gzCLxCBP1o0" },
  { youtubeId: "JqY3L7IJOOY" },
  { youtubeId: "xHFK54C4mc0" },
  { youtubeId: "Z208PaNZY4U" },
];

function WaveDown({ from, to }: { from: string; to: string }) {
  return (
    <div className={`${from} -mb-1`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 block">
        <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill={to} />
      </svg>
    </div>
  );
}

function WaveUp({ from, to }: { from: string; to: string }) {
  return (
    <div className={`${from} -mt-1`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 block">
        <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill={to} />
      </svg>
    </div>
  );
}

const testimonialsSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PaintingContractor"],
  "@id": `${BASE_URL}/testimonials#localbusiness`,
  name: "The Proud Paintbrush",
  image: `${BASE_URL}/images/happy-customers-the-proud-paintbrush-sugar-land-tx.jpg`,
  url: `${BASE_URL}/testimonials`,
  telephone: PHONE_TEL,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sugar Land",
    addressRegion: "TX",
    postalCode: "77498",
    addressCountry: "US",
  },
  areaServed: [
    "Sugar Land, TX",
    "Missouri City, TX",
    "Katy, TX",
    "Richmond, TX",
    "Fulshear, TX",
    "Rosenberg, TX",
    "West Houston, TX",
    "Southwest Houston, TX",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: AGGREGATE_RATING.value,
    reviewCount: AGGREGATE_RATING.count,
    bestRating: "5",
    worstRating: "1",
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsSchema) }}
      />

      {/* HERO */}
      <section className="bg-[#4B83B2] text-white pt-20 pb-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
            Reviews &amp; Testimonials
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">
            What Sugar Land Homeowners Say About The Proud Paintbrush
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-3">
            Hundreds of families across Sugar Land, Missouri City, Katy, and Fort Bend County
            have trusted us with their homes. Here&apos;s what they had to say.
          </p>
          <p className="text-white/80 text-sm">
            {AGGREGATE_RATING.value}★ average from {AGGREGATE_RATING.count}+ reviews · Licensed · Insured · Locally owned
          </p>
        </div>
        <WaveDown from="bg-[#4B83B2]" to="#111111" />
      </section>

      {/* FEATURED VIDEO */}
      <section className="bg-[#111111] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            A Featured Customer Review
          </h2>
          <p className="text-center text-white/70 mb-10 max-w-2xl mx-auto">
            Dr. Tepper found us through a neighbor in Avalon and trusted us with his exterior
            repaint. Here&apos;s what he had to say.
          </p>
          <VideoTestimonial
            variant="featured"
            youtubeId="HkXdwkgfhCI"
            customerName="Dr. Tepper"
            customerNeighborhood="Avalon · Exterior House Painting"
            city="Sugar Land"
          />
        </div>
      </section>
      <WaveUp from="bg-[#111111]" to="#ffffff" />

      {/* PHOTO CAROUSEL */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-2">
            Real Customers, Real Finished Homes
          </h2>
          <p className="text-gray-500 text-center mb-10 text-lg">
            Every project ends the same way — a happy homeowner in front of a freshly painted home.
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* AUTHENTIC VIDEO GRID */}
      <WaveDown from="bg-white" to="#111111" />
      <section className="bg-[#111111] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            More Customers, In Their Own Words
          </h2>
          <p className="text-center text-white/70 mb-10 max-w-2xl mx-auto">
            Short, unscripted video reviews from Fort Bend County homeowners. Tap any
            thumbnail to play.
          </p>
          <AuthenticVideoGrid videos={authenticVideos} city="Sugar Land" />
        </div>
      </section>
      <WaveUp from="bg-[#111111]" to="#ffffff" />

      {/* CTA */}
      <section className="bg-[#4B83B2] text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-white/90 text-lg mb-10 leading-relaxed">
            Get a free, no-pressure estimate and find out why Fort Bend County homeowners
            trust The Proud Paintbrush.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#4B83B2] hover:bg-[#111111] hover:text-white font-semibold px-10 py-4 text-lg transition-colors"
            >
              Schedule Your Free Estimate
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-10 py-4 text-lg transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
          <p className="text-white/70 text-sm mt-8">
            <Link href="/exterior-painting" className="underline hover:text-white">
              Explore our exterior painting services
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
