import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://www.theproudpaintbrush.com";
const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";
const PHONE = "(832) 605-0493";
const PHONE_TEL = "+18326050493";

export const metadata: Metadata = {
  title: "Painting FAQs | Sugar Land & Fort Bend County",
  description:
    "Answers to common questions about painting in Sugar Land & Fort Bend County — pricing, timelines, paint brands, Texas weather & warranties. Free estimates.",
  alternates: { canonical: `${BASE_URL}/faq` },
  openGraph: {
    title: "Painting FAQs | The Proud Paintbrush",
    description:
      "Common questions about painting in Sugar Land & Fort Bend County — pricing, timelines, paint, Texas weather, and warranties.",
    url: `${BASE_URL}/faq`,
    images: [
      {
        url: `${BASE_URL}/images/exterior-painting-happy-customer-sugar-land-tx.jpg`,
        width: 1200,
        height: 630,
        alt: "Exterior painting customer in Sugar Land, TX",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Painting FAQs | The Proud Paintbrush",
    description:
      "Common questions about painting in Sugar Land & Fort Bend County — pricing, timelines, paint, Texas weather, and warranties.",
    images: [`${BASE_URL}/images/exterior-painting-happy-customer-sugar-land-tx.jpg`],
  },
};

type Faq = { q: string; a: string };
type FaqGroup = { heading: string; faqs: Faq[] };

const faqGroups: FaqGroup[] = [
  {
    heading: "General & Getting Started",
    faqs: [
      {
        q: "What types of painting services do you offer?",
        a: "We offer interior painting, exterior painting, cabinet painting, drywall repair, fence staining, surface preparation, and related residential painting services.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve Sugar Land, Missouri City, Richmond, Katy, Rosenberg, Stafford, Fulshear, Pearland, West Houston, Southwest Houston, and surrounding Fort Bend County communities.",
      },
      {
        q: "Do you offer free estimates?",
        a: "Yes! We offer free painting estimates so you can plan your project with confidence.",
      },
      {
        q: "Is your team background-checked and insured?",
        a: "Absolutely. Every team member is background-checked, professionally trained, and fully insured. We treat every home with respect and maintain a clean, organized worksite throughout the project.",
      },
    ],
  },
  {
    heading: "Process, Paint & Timeline",
    faqs: [
      {
        q: "How long does a typical painting project take?",
        a: "Most interior painting projects take 2–5 days, depending on the size of the home and the level of detail involved. Exterior painting projects typically take 3–7 days, depending on weather conditions, surface preparation needs, and the size of the property. We communicate clearly throughout the process so you always know what to expect.",
      },
      {
        q: "What brands of paint do you use?",
        a: "We primarily use Sherwin-Williams paints because of their durability, coverage, and extensive color selections. We're also happy to help homeowners choose the right color, sheen, and product for each surface.",
      },
      {
        q: "How do I choose the right paint color?",
        a: "We offer color consultations and can help you test samples on your walls so you can confidently choose the perfect color.",
      },
    ],
  },
  {
    heading: "Texas Weather & Durability",
    faqs: [
      {
        q: "Is exterior paint harder on homes in Texas?",
        a: "Yes. Texas homes deal with intense heat, UV exposure, humidity, and severe weather. That's why prep work and high-quality exterior coatings are especially important.",
      },
      {
        q: "Do you paint during the winter?",
        a: "Yes. Interior painting can be completed year-round. For exterior projects, we monitor weather conditions and schedule work during appropriate temperature and humidity ranges.",
      },
      {
        q: "What's the best time of year to paint a home?",
        a: "Spring and fall typically offer the most ideal conditions for exterior painting, but with proper preparation and scheduling, painting projects can be completed most of the year in the Houston area.",
      },
      {
        q: "How long should a professional paint job last?",
        a: "Most professionally painted interiors and exteriors can last many years depending on preparation quality, product selection, environmental exposure, and maintenance.",
      },
    ],
  },
  {
    heading: "Pricing & Estimates",
    faqs: [
      {
        q: "How much does it cost to paint a house interior?",
        a: "Most interior projects range from $3,000 to $20,000+ depending on size, prep, and detail.",
      },
      {
        q: "How much does it cost to paint kitchen cabinets?",
        a: "Cabinet painting typically ranges from $2,000 to $10,000+ based on size, prep, and finish quality.",
      },
      {
        q: "What affects the cost of a painting job?",
        a: "Prep work, repairs, number of colors, surface condition, and product selection all play a major role.",
      },
      {
        q: "Are there hidden fees in your estimates?",
        a: "No. Our estimates are detailed and transparent so you know exactly what you are paying for.",
      },
      {
        q: "How do unexpected repairs affect pricing?",
        a: "If we uncover issues mid-project, we communicate clearly and provide options before proceeding.",
      },
    ],
  },
  {
    heading: "Warranty & Satisfaction",
    faqs: [
      {
        q: "Do you warranty your work?",
        a: "Yes. All of our work includes a written warranty and satisfaction guarantee, based on the scope of the project.",
      },
      {
        q: "What kind of warranty do you offer?",
        a: "We offer both 2-year and 4-year workmanship warranties depending on the project scope.",
      },
      {
        q: "Do you actually honor your painting warranty?",
        a: "Yes. If a workmanship-related issue occurs during the warranty period, we'll inspect the concern, communicate clearly, and work toward a resolution.",
      },
      {
        q: "What voids a painting warranty?",
        a: "Things like water leaks, structural movement, physical damage, excessive moisture, or improper maintenance can affect warranty coverage. We explain expectations before every project.",
      },
      {
        q: "Are touch-ups included?",
        a: "For qualifying workmanship-related concerns during the warranty period, touch-ups may be included depending on the situation and package selected.",
      },
    ],
  },
];

const allFaqs = faqGroups.flatMap((g) => g.faqs);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="bg-[#4B83B2] text-white pt-20 pb-4">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
            Frequently Asked Questions
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">
            Painting FAQs for Sugar Land &amp; Fort Bend County
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Everything homeowners ask us about pricing, timelines, paint, Texas weather, and
            our warranty — answered honestly, before you ever book.
          </p>
        </div>
        <WaveDown from="bg-[#4B83B2]" to="#ffffff" />
      </section>

      {/* FAQ GROUPS */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          {faqGroups.map((group) => (
            <div key={group.heading} className="mb-14 last:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-8 pb-3 border-b-2 border-[#4B83B2]">
                {group.heading}
              </h2>
              <div className="space-y-6">
                {group.faqs.map((faq) => (
                  <div key={faq.q} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-semibold text-lg text-[#111111] mb-2">{faq.q}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Still have a question?</h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Get a free, no-pressure estimate and we&apos;ll answer everything specific to your
            home and project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#4B83B2] text-white hover:bg-white hover:text-[#111111] font-semibold px-10 py-4 text-lg transition-colors"
            >
              Schedule Your Free Estimate
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#111111] font-semibold px-10 py-4 text-lg transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
          <p className="text-white/60 text-sm mt-8">
            <Link href="/testimonials" className="underline hover:text-white">
              See what our customers say
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
