import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Vision | Residential Painters Sugar Land TX",
  description:
    "The Proud Paintbrush vision: to be Fort Bend County's most respected painting company. Community-focused, quality-driven, relationship-first.",
  alternates: { canonical: "https://www.theproudpaintbrush.com/our-vision" },
  openGraph: {
    title: "Our Vision | Residential Painters Sugar Land TX",
    description:
      "The Proud Paintbrush vision: to be Fort Bend County's most respected painting company. Community-focused, quality-driven, relationship-first.",
    url: "https://www.theproudpaintbrush.com/our-vision",
    type: "website",
    images: [{ url: "https://www.theproudpaintbrush.com/images/paint-it-forward-community.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Vision | Residential Painters Sugar Land TX",
    description: "Our vision for a more beautiful Fort Bend County, one home at a time.",
    images: ["https://www.theproudpaintbrush.com/images/paint-it-forward-community.jpg"],
  },
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

const desireZoneList = [
  "Intentional in every project",
  "Excellent in our craft",
  "Community-minded in every relationship",
];

const valuesOrderedList = [
  "Caring for our customers like family",
  "Delivering detailed, high-end finishes",
  "Putting in the work it takes to get it right",
];

const paintItForwardList = [
  "Transforms homes for those who cannot afford renovations",
  "Builds hope and pride in our community",
];

const greatHomesList = [
  "Exterior painting",
  "Siding updates",
  "Trim and wood restoration",
  "Brick repainting",
];

const highEndServicesList = [
  "Luxury interior painting",
  "Exterior painting with premium materials",
  "Fine trim, millwork, and specialty finishes",
];

const legacyList = [
  "Lasting relationships",
  "A legacy of reliability",
  "Hometown pride through painting",
];

const faqs = [
  {
    question: "What makes The Proud Paintbrush different from other painters in Sugar Land?",
    answer: "We focus on relationships and detail-driven craftsmanship rather than speed or volume.",
  },
  {
    question: "Do you only work in Sugar Land?",
    answer:
      "We proudly serve Sugar Land, Fort Bend County, Richmond, Katy, and surrounding Houston areas.",
  },
  {
    question: "How can I be part of your Paint It Forward program?",
    answer: "Nominate a family, neighbor, or nonprofit on our Paint It Forward page.",
  },
  {
    question: "What types of painting projects do you specialize in?",
    answer:
      "We specialize in luxury interior painting, exterior painting, and high-end trim/millwork finishes.",
  },
];

export default function OurVisionPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[90vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/migrated/satisfied-customer-richmond-exterior-painting.webp"
          alt="Satisfied Richmond, TX homeowners in front of their freshly painted home by The Proud Paintbrush"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Our Vision – Residential Painters in Sugar Land, TX
          </h1>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#3A6A96] font-semibold px-10 py-4 text-lg transition-colors"
          >
            Schedule Your Free Estimate
          </a>
        </div>
      </section>

      {/* THE VISION */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-6">
            The Vision Behind The Proud Paintbrush
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At The Proud Paintbrush, our mission is clear: to grow with purpose and become the most
            respected painting company in Fort Bend County. We aren&apos;t trying to be the
            biggest—we want to be the residential painters in Sugar Land who care the most.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Every brushstroke, every interaction, and every completed project reflects our
            commitment to craftsmanship, service, and community pride. Our story is what fuels
            everything that we do.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            We work in what we call our &ldquo;desire zone&rdquo;—the sweet spot where passion and
            purpose meet. As Michael Hyatt says, &ldquo;When you&apos;re doing what you love,
            you&apos;re creating value for yourself and those around you.&rdquo;
          </p>
          <p className="font-semibold text-[#111111] mb-3">This belief drives us to be:</p>
          <ul className="space-y-2 mb-8">
            {desireZoneList.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#3A6A96] font-bold mt-0.5">→</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold text-[#111111] mb-3">Our values:</p>
          <ol className="space-y-2 mb-6">
            {valuesOrderedList.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#3A6A96] font-bold">{i + 1}.</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ol>
          <p className="text-gray-600 leading-relaxed">
            Through these principles, we aim to be the go-to premium painting company in Sugar
            Land, Richmond, Katy, and the Greater Houston area.
          </p>
        </div>
      </section>

      {/* MAKING FORT BEND BEAUTIFUL */}
      <WaveUp from="bg-white" to="#111111" />
      <section className="bg-[#111111] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Making Fort Bend County Beautiful
          </h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
            Our goal is simple: Let&apos;s make Fort Bend County the prettiest county in Texas!
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Paint It Forward Program</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                We believe everyone deserves to love their home. Through Paint It Forward, we offer
                free painting services to local families in need. This initiative:
              </p>
              <ul className="space-y-2 mb-10">
                {paintItForwardList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#3A6A96] font-bold mt-0.5">✓</span>
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-bold text-white mb-3">Great Homes Program</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                As a partner of Sugar Land&apos;s Great Homes Initiative, we help eligible
                homeowners access up to $10,000 in financial assistance for:
              </p>
              <ul className="space-y-2">
                {greatHomesList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#3A6A96] font-bold mt-0.5">✓</span>
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 lg:h-[400px] overflow-hidden">
              <Image
                src="/images/vision-paint-it-forward.jpg"
                alt="The Proud Paintbrush team at the Paint It Forward event in Sugar Land, TX"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>
      <WaveDown from="bg-[#111111]" to="#ffffff" />

      {/* HIGH-END SERVICES */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-6">
            High-End Painting Services
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At The Proud Paintbrush, we are detail-driven finishers, not just painters. Our
            expertise includes:
          </p>
          <ul className="space-y-3 mb-6">
            {highEndServicesList.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#3A6A96] font-bold mt-0.5">→</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed">
            We use top-tier products and proven techniques to create elegant finishes that elevate
            your home&apos;s style and value. For homeowners in Sugar Land, Katy, Richmond, and
            beyond, we deliver results that last.
          </p>
        </div>
      </section>

      {/* LEGACY */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-8 text-center">
            A Legacy of Trust and Beauty
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">We aim to build more than just beautiful spaces:</p>
              <ul className="space-y-3 mb-8">
                {legacyList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#3A6A96] font-bold mt-0.5">✓</span>
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-[#3A6A96] text-[#3A6A96] hover:bg-[#3A6A96] hover:text-white font-semibold px-8 py-3 transition-colors"
              >
                Book a Free Consultation
              </a>
            </div>
            <div className="relative h-72 overflow-hidden">
              <Image
                src="/images/vision-team.jpg"
                alt="The Proud Paintbrush team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#111111] mb-10 text-center">
            FAQs – Our Vision at The Proud Paintbrush
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <p className="font-semibold text-[#111111] mb-2">{faq.question}</p>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLUE CTA */}
      <WaveUp from="bg-white" to="#3A6A96" />
      <section className="bg-[#3A6A96] text-white py-16 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Work With a Team That Truly Cares?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Schedule a free estimate and experience the difference vision-driven painting makes.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#3A6A96] font-semibold px-10 py-4 text-lg transition-colors"
        >
          Schedule Your Free Estimate
        </a>
      </section>
      <WaveDown from="bg-[#3A6A96]" to="#ffffff" />
      <div className="bg-white h-4" />
    </>
  );
}
