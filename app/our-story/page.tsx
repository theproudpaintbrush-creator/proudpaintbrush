import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story | The Proud Paintbrush Sugar Land",
  description:
    "The story behind The Proud Paintbrush — a family business founded by Chris Petkau in Sugar Land, TX. Built on faith, perseverance, and pride in every home.",
  alternates: { canonical: "https://www.theproudpaintbrush.com/our-story" },
};

const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";

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

const whatSetsUsApart = [
  "Professional Service, Start to Finish – From your first call to final walkthrough, we keep the process clear and simple.",
  "Clear Communication – We provide updates so you always know what's happening next.",
  "Detailed Estimates – No guesswork—our estimates are precise, accurate, and easy to understand.",
  "Proactive Planning – We anticipate your needs, saving you time and effort.",
  "Pride and Trust – Hundreds of homeowners across Sugar Land, Houston, and Missouri City trust our team—and we'd be proud to earn yours too.",
];

const visionList = [
  "Grow Thoughtfully: Focus on quality, not size.",
  'Beautify the Community: Through programs like "Paint It Forward" and city initiatives.',
  "Form Lasting Relationships: Build trust and impact lives with every project.",
];

const coreValuesList = [
  "Caring About Customers – Every project begins with understanding your needs.",
  "Attention to Detail – We focus on clean lines, smooth finishes, and a stress-free process.",
  "Hard Work – We show up ready to give our best every day.",
];

const faqs = [
  {
    question: "Why choose The Proud Paintbrush in Sugar Land, TX?",
    answer:
      "We combine professional painting, clear communication, and pride in our work to create a simple, high-quality experience for homeowners.",
  },
  {
    question: "Do you only serve Sugar Land?",
    answer:
      "No. We proudly serve Sugar Land, Houston, Missouri City, and surrounding Fort Bend County areas.",
  },
  {
    question: "What makes your painting company different?",
    answer:
      "We focus on pride, detail, and community impact—not just speed. Our clients trust us to deliver excellent craftsmanship and lasting results.",
  },
  {
    question: "Do you offer free estimates?",
    answer: "Yes! We offer free painting estimates so you can plan your project with confidence.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[90vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/story-family-1.jpg"
          alt="The Proud Paintbrush family — Chris Petkau with his wife and sons in Sugar Land, TX"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Our Story – The Proud Paintbrush in Sugar Land, TX
          </h1>
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

      {/* ORIGIN STORY */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-6">
                A Family Business With Heart
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At The Proud Paintbrush, based in Sugar Land, TX, our story is one of growth,
                craftsmanship, and community. Founded by Chris Petkau, our company began as a
                one-man operation and has become a multi-crew painting team serving Sugar Land,
                Houston, Missouri City, and surrounding areas.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Chris grew up in Vancouver, Canada, with a strong foundation in construction
                inspired by his father's concrete business. After moving to Texas in 2020, he
                turned this hands-on experience into a passion for painting and a clear vision for
                helping homeowners bring pride back to their homes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                In 2020, during the uncertainty of COVID, Chris and Sarah made the decision to move
                to Houston and start a new chapter of their lives. That same year, The Proud
                Paintbrush was born.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Around that same time, they also learned they were facing infertility and began the
                difficult journey through IVF treatments. Starting a business while walking through
                infertility was one of the hardest seasons of their lives, but it strengthened their
                faith, perseverance, and commitment to building something lasting.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Today, Chris and Sarah are proud parents to their two sons, Isaac and Samuel.
              </p>
              <p className="text-gray-600 leading-relaxed">
                That family foundation remains at the heart of The Proud Paintbrush. We understand
                what it means to overcome challenges, communicate through difficult situations, and
                care deeply about the people we serve. We bring that same dedication, pride, and
                attention to every home we work in.
              </p>
            </div>
            <div className="relative h-96 lg:h-[520px] overflow-hidden">
              <Image
                src="/images/story-family-2.jpg"
                alt="Chris Petkau, owner of The Proud Paintbrush, with his family"
                fill
                className="object-cover object-center"
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT SETS US APART */}
      <WaveUp from="bg-white" to="#111111" />
      <section className="bg-[#111111] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">What Sets Us Apart</h2>
          <ul className="space-y-4">
            {whatSetsUsApart.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#4B83B2] font-bold text-lg mt-0.5">✓</span>
                <span className="text-white/80 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <WaveDown from="bg-[#111111]" to="#ffffff" />

      {/* VISION + VALUES */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#111111] mb-6">
                Our Vision: Where We&apos;re Going
              </h2>
              <ul className="space-y-3">
                {visionList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#4B83B2] font-bold mt-0.5">→</span>
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#111111] mb-6">Our Core Values</h2>
              <ul className="space-y-3">
                {coreValuesList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#4B83B2] font-bold mt-0.5">→</span>
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO ROW */}
      <section className="bg-white pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { src: "/images/story-family-1.jpg", alt: "The Proud Paintbrush family in Sugar Land, TX" },
              { src: "/images/story-family-2.jpg", alt: "Chris Petkau and family" },
              { src: "/images/story-family-3.jpg", alt: "The Petkau family — the heart of The Proud Paintbrush" },
            ].map((img) => (
              <div key={img.src} className="relative h-64 overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover object-center" quality={90} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#111111] mb-10 text-center">
            Frequently Asked Questions
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
      <WaveUp from="bg-[#f8f9fa]" to="#4B83B2" />
      <section className="bg-[#4B83B2] text-white py-16 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          See How We Approach Every Project
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          From prep to final walkthrough — discover the process that sets The Proud Paintbrush apart.
        </p>
        <Link
          href="/interior-painting"
          className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-10 py-4 text-lg transition-colors"
        >
          See How We Approach Every Project
        </Link>
      </section>
      <WaveDown from="bg-[#4B83B2]" to="#ffffff" />
      <div className="bg-white h-4" />
    </>
  );
}
