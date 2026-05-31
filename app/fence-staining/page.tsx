import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fence Staining in Sugar Land & Fort Bend County",
  description:
    "Professional fence staining & sealing in Sugar Land, Katy & Fort Bend County. Protect your fence from Texas weather. Free estimates. Call (832) 605-0493.",
  openGraph: {
    title: "Fence Staining in Sugar Land & Fort Bend County | The Proud Paintbrush",
    description:
      "Professional fence staining & sealing in Sugar Land, Katy & Fort Bend County. Protect your fence from Texas weather. Free estimates. Call (832) 605-0493.",
    url: "https://www.theproudpaintbrush.com/fence-staining",
  },
};

const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fence Staining",
  provider: {
    "@type": "LocalBusiness",
    name: "The Proud Paintbrush",
    telephone: "+18326050493",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sugar Land",
      addressRegion: "TX",
      postalCode: "77498",
      addressCountry: "US",
    },
  },
  areaServed: [
    "Houston, TX",
    "Sugar Land, TX",
    "Pearland, TX",
    "Missouri City, TX",
    "Richmond, TX",
    "Rosenberg, TX",
    "Katy, TX",
    "Southwest Houston, TX",
  ],
  description:
    "Professional fence staining and sealing services in Sugar Land, Katy, and Fort Bend County. Protect your fence from Texas weather.",
};

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

const serviceAreas = [
  "Houston",
  "Sugar Land",
  "Pearland",
  "Missouri City",
  "Richmond",
  "Rosenberg",
  "Katy",
  "Southwest Houston",
];

const whyChooseUs = [
  {
    title: "Expert Preparation",
    desc: "Proper cleaning and prep work ensure the stain bonds correctly and lasts for years.",
  },
  {
    title: "Premium Stains",
    desc: "We use professional-grade stains and sealers designed for the Texas climate.",
  },
  {
    title: "Protection & Beauty",
    desc: "Our process protects your fence from UV damage, moisture, and deterioration while enhancing its appearance.",
  },
  {
    title: "Local Professionals",
    desc: "We understand Houston-area weather and choose products that perform in our specific conditions.",
  },
];

const processSteps = [
  {
    num: "1",
    title: "Inspection & Free Quote",
    desc: "We inspect your fence, assess its current condition, and provide a free estimate with no obligation.",
  },
  {
    num: "2",
    title: "Thorough Cleaning",
    desc: "We power wash the fence to remove dirt, mildew, and old stain — creating a clean surface for the new stain to penetrate.",
  },
  {
    num: "3",
    title: "Prep Work",
    desc: "We sand rough areas and address minor repairs to ensure the fence is ready for staining.",
  },
  {
    num: "4",
    title: "Staining & Sealing",
    desc: "We apply professional-grade stain and sealer using the appropriate method for your fence type and condition.",
  },
  {
    num: "5",
    title: "Final Walkthrough",
    desc: "We review the finished work with you to make sure you're happy with the results before we leave.",
  },
];

const benefits = [
  "Increases the lifespan of your fence",
  "Prevents sun and water damage",
  "Boosts property value and curb appeal",
  "Custom color and finish options",
  "Cost-effective maintenance solution",
];

const faqs = [
  {
    q: "How often should I stain my fence?",
    a: "Most wood fences benefit from staining every 2–3 years in the Houston area, where UV exposure and humidity can break down the coating more quickly than in milder climates. Signs it's time to restain include fading, graying, or water no longer beading on the surface.",
  },
  {
    q: "Should I stain or paint my fence?",
    a: "For most wood fences, staining is preferred over paint. Stain penetrates the wood and allows it to breathe, which helps prevent peeling and cracking. Paint sits on the surface and can trap moisture, leading to premature failure. We can help you decide the best option for your specific fence and goals.",
  },
  {
    q: "Do you power wash before staining?",
    a: "Yes. Power washing is a standard part of our preparation process. A clean surface is essential for the stain to penetrate properly and bond to the wood.",
  },
  {
    q: "How long does fence staining take?",
    a: "Most fence staining projects are completed in one day. Larger properties or fences requiring significant prep work may take longer. We outline the timeline during your free estimate.",
  },
];

export default function FenceStainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* HERO */}
      <section className="relative w-full h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/customer-fence-staining.jpg"
          alt="Happy customer holding 100% satisfied sign after fence staining in Sugar Land, TX"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Fence Staining &ndash; Protect &amp; Beautify Your Fence
          </h1>
          <p className="text-lg sm:text-xl text-white/85 mb-8">
            Fence staining protects wood from sun, rain, and humidity while adding curb appeal.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#111111] font-semibold px-8 py-4 transition-colors"
          >
            Schedule Your Free Estimate &rarr;
          </a>
        </div>
      </section>

      {/* SECTION 1 — Why It Matters (white bg) */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-8">
            Why Fence Staining Matters
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed text-center">
            Fences in Houston, Sugar Land, Pearland, Missouri City, Richmond, and surrounding areas endure intense sun, rain, and humidity. Without proper protection, wood can fade, crack, and deteriorate. Our expert fence staining process combines beauty and durability, ensuring your outdoor spaces look amazing year-round.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Photos + Why Us (black bg with waves) */}
      <WaveDown from="bg-white" to="#111111" />
      <section className="bg-[#111111] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Why Choose The Proud Paintbrush for Fence Staining
          </h2>
          {/* Photo row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {[
              { src: "/images/fence-1.jpg", alt: "Fence staining Sugar Land TX" },
              { src: "/images/fence-2.jpg", alt: "Wood fence staining before and after" },
              { src: "/images/fence-3.jpg", alt: "Professional fence staining Fort Bend County" },
            ].map((img) => (
              <div key={img.src} className="relative h-64 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
            ))}
          </div>
          {/* Why choose us points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="border border-white/20 p-6">
                <h3 className="font-bold text-[#4B83B2] mb-3 text-lg">{item.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WaveUp from="bg-[#111111]" to="#ffffff" />

      {/* SECTION 3 — Process (white bg) */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-12">
            Our Fence Staining Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-[#4B83B2] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-[#111111] mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Benefits (light gray bg) */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-10">
            Benefits of Professional Fence Staining
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="text-[#4B83B2] font-bold mt-0.5 text-lg">&#10003;</span>
                <span className="text-gray-700 text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 5 — FAQs (white bg) */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border border-gray-200 p-6">
                <h3 className="font-bold text-[#111111] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Service Areas + CTA (blue bg) */}
      <section className="bg-[#4B83B2] text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Fence Staining in Sugar Land &amp; Surrounding Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="bg-white/20 text-white text-sm font-medium px-4 py-2"
              >
                {area}
              </span>
            ))}
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-10 py-4 text-lg transition-colors"
          >
            Schedule Your Free Estimate
          </a>
        </div>
      </section>
    </>
  );
}
