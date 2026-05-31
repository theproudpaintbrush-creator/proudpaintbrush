import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug } from "@/lib/cities";
import { getService, getServiceSlugs, getServicesByParent } from "@/lib/services";
import VideoTestimonial, { AuthenticVideoGrid } from "@/components/VideoTestimonial";
import CustomerPhotoGrid, { BeforeAfterGrid } from "@/components/CustomerPhotoGrid";
import ServiceDetail from "@/components/ServiceDetail";
import { buildServiceSchemas } from "@/lib/serviceSchema";

const BASE_URL = "https://www.theproudpaintbrush.com";
const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";
const PHONE = "(832) 605-0493";
const PHONE_TEL = "+18326050493";

type RouteParams = { city: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return [
    ...CITIES.map((c) => ({ city: c.slug })),
    ...getServiceSlugs("interior").map((slug) => ({ city: slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) {
    const svc = getService("interior", slug);
    if (!svc) return {};
    const svcUrl = `${BASE_URL}/interior-painting/${svc.slug}`;
    return {
      title: svc.title,
      description: svc.metaDescription,
      alternates: { canonical: svcUrl },
      openGraph: {
        title: svc.title,
        description: svc.metaDescription,
        url: svcUrl,
        type: "website",
        ...(svc.ogImage ? { images: [{ url: svc.ogImage }] } : {}),
      },
      twitter: { card: "summary_large_image", title: svc.title, description: svc.metaDescription },
    };
  }

  const url = `${BASE_URL}/interior-painting/${city.slug}`;
  const ogImage = city.interior.ogImage ?? city.ogImage;
  const hero = city.interior.hero ?? city.hero;
  return {
    title: city.interior.title,
    description: city.interior.description,
    alternates: { canonical: url },
    openGraph: {
      title: city.interior.title,
      description: city.interior.description,
      url,
      images: [
        {
          url: `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: hero.alt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: city.interior.title,
      description: city.interior.description,
      images: [`${BASE_URL}${ogImage}`],
    },
  };
}

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

export default async function InteriorCityPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) {
    const svc = getService("interior", slug);
    if (!svc) notFound();
    const related = getServicesByParent("interior")
      .filter((s) => s.slug !== svc.slug)
      .map((s) => ({ slug: s.slug, name: s.name }));
    const schemas = buildServiceSchemas(svc);
    return (
      <>
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
        <ServiceDetail service={svc} related={related} />
      </>
    );
  }

  const url = `${BASE_URL}/interior-painting/${city.slug}`;
  const content = city.interior;
  const hero = content.hero ?? city.hero;
  const ogImage = content.ogImage ?? city.ogImage;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: "The Proud Paintbrush",
    image: `${BASE_URL}${ogImage}`,
    url,
    telephone: PHONE_TEL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sugar Land",
      addressRegion: "TX",
      postalCode: "77498",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: city.aggregateRating.value,
      reviewCount: city.aggregateRating.count,
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Interior Painting in ${city.name}`,
    serviceType: "Interior Painting",
    provider: { "@id": `${url}#localbusiness` },
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    description: content.description,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Interior Painting", item: `${BASE_URL}/interior-painting` },
      { "@type": "ListItem", position: 3, name: city.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO + ABOVE-FOLD CTA */}
      <section className="relative w-full h-[78vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-white/70 tracking-wider uppercase">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/interior-painting" className="hover:text-white">Interior Painting</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
            {content.h1}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-3">
            Local interior painters serving {city.name} and {city.county}.
          </p>
          <p className="text-sm sm:text-base text-white/70 mb-8">
            Licensed · Insured · Locally owned · {city.aggregateRating.value}★ from {city.aggregateRating.count} {city.name} homeowners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-white bg-white text-[#111111] hover:bg-transparent hover:text-white font-semibold px-8 py-4 transition-colors"
            >
              Get a Free {city.name} Estimate &rarr;
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#111111] font-semibold px-8 py-4 transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-10">
            Interior Painting Built for {city.name} Homes
          </h2>
          {content.introParagraphs.map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-5 text-lg">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* FEATURED VIDEO TESTIMONIAL (black bg with waves) */}
      <WaveDown from="bg-white" to="#111111" />
      <section className="bg-[#111111] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            What {city.name} Homeowners Say
          </h2>
          <p className="text-center text-white/70 mb-10 max-w-2xl mx-auto">
            A featured testimonial from a recent {content.featuredVideo.customerNeighborhood ?? city.name} customer.
          </p>
          <VideoTestimonial
            variant="featured"
            youtubeId={content.featuredVideo.youtubeId}
            posterImage={content.featuredVideo.posterImage ?? ogImage}
            customerName={content.featuredVideo.customerName}
            customerNeighborhood={content.featuredVideo.customerNeighborhood}
            city={city.name}
          />
        </div>
      </section>
      <WaveUp from="bg-[#111111]" to="#ffffff" />

      {/* CLIMATE / WHY DIFFERENT */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-8">
            {content.climateSection.heading}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {content.climateSection.body}
          </p>
        </div>
      </section>

      {/* NEIGHBORHOODS (gray bg) */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-6">
            {content.neighborhoodsSection.heading}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg text-center max-w-3xl mx-auto mb-10">
            {content.neighborhoodsSection.intro}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {city.neighborhoods.map((n) => (
              <div
                key={n}
                className="bg-white border border-gray-200 px-4 py-3 text-[#111111] text-sm font-medium text-center"
              >
                {n}
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm text-center mt-8">
            Serving ZIP codes {city.zips.join(", ")} and surrounding {city.county} areas.
          </p>
        </div>
      </section>

      {/* CUSTOMER PHOTO GRID — "100% Satisfied" sign photos */}
      <section className="bg-white py-20">
        <CustomerPhotoGrid
          photos={content.customerPhotos}
          city={city.name}
          heading={`Real ${city.name} Customers, Real Finished Interiors`}
          subheading={`Every job ends the same way — a homeowner happy with a freshly painted home. Here are a few from ${city.name}.`}
        />
      </section>

      {/* BEFORE/AFTER */}
      {content.beforeAfterPhotos?.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4 text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-3">
              Before &amp; After in {city.name}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The difference proper prep makes on a {city.name} interior.
            </p>
          </div>
          <BeforeAfterGrid pairs={content.beforeAfterPhotos} city={city.name} />
        </section>
      )}

      {/* HOME STYLES & SURFACES */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-8">
            {content.homeStylesSection.heading}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {content.homeStylesSection.body}
          </p>
        </div>
      </section>

      {/* AUTHENTIC VIDEO GRID (black bg) */}
      <WaveDown from="bg-white" to="#111111" />
      <section className="bg-[#111111] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            More {city.name} Customers, In Their Own Words
          </h2>
          <p className="text-center text-white/70 mb-10 max-w-2xl mx-auto">
            Short, unscripted video reviews from {city.name} homeowners.
          </p>
          <AuthenticVideoGrid videos={content.authenticVideos} city={city.name} />
        </div>
      </section>
      <WaveUp from="bg-[#111111]" to="#ffffff" />

      {/* WHY LOCAL */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-8">
            {content.whyLocalSection.heading}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {content.whyLocalSection.body}
          </p>
        </div>
      </section>

      {/* FAQS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-12">
            Interior Painting in {city.name} — Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {content.faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-200 p-6">
                <h3 className="font-bold text-[#111111] mb-2 text-lg">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-[#4B83B2] text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Refresh Your {city.name} Interior?
          </h2>
          <p className="text-white/90 text-lg mb-10 leading-relaxed">
            {content.closingCta}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#4B83B2] hover:bg-[#111111] hover:text-white font-semibold px-10 py-4 text-lg transition-colors"
            >
              Request a Free Estimate
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-10 py-4 text-lg transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
          <p className="text-white/70 text-sm mt-8">
            Also serving:{" "}
            {CITIES.filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/interior-painting/${c.slug}`}
                  className="underline hover:text-white"
                >
                  {c.name}
                </Link>
              ))
              .reduce<React.ReactNode[]>((acc, link, i, arr) => {
                acc.push(link);
                if (i < arr.length - 1) acc.push(<span key={`sep-${i}`}> · </span>);
                return acc;
              }, [])}
          </p>
        </div>
      </section>
    </>
  );
}
