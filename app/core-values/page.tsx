import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Core Values | The Proud Paintbrush Sugar Land TX",
  description:
    "The Proud Paintbrush is built on Care for People, Attention to Detail, and Hard Work. See how our values shape every painting project in Sugar Land.",
  alternates: { canonical: "https://www.theproudpaintbrush.com/core-values" },
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

const valuesAffectList = [
  "How carefully your home is protected",
  "Whether surfaces are properly prepared",
  "How problems are handled",
  "Whether communication is proactive or reactive",
  "The quality of the finished product",
  "How long the paint job lasts",
];

const coreValues = [
  {
    title: "Care for People",
    intro:
      "We believe people remember how you made them feel. That's why we focus heavily on communication, respect, honesty, and follow-through throughout the entire painting process.",
    list: [
      "Listening carefully to your goals",
      "Respecting your schedule and home",
      "Providing transparent pricing and expectations",
      "Keeping communication open throughout the project",
      "Maintaining clean and organized jobsites",
      "Addressing concerns quickly and professionally",
    ],
    closing:
      "Your home is personal. We never forget that. Whether we're painting one bedroom or an entire exterior, we want you to feel confident and cared for every step of the way.",
  },
  {
    title: "Attention to Detail",
    intro:
      "Great painting is won during preparation. Most homeowners never see the sanding, patching, masking, caulking, surface repairs, and protection work that happens before paint is applied—but that's where quality is built.",
    list: [
      "Smooth wall repairs",
      "Crisp cut lines",
      "Proper caulking",
      "Thorough sanding",
      "Correct primer selection",
      "Even sheen consistency",
      "Careful masking and protection",
      "Clean finishes around trim, doors, and cabinets",
    ],
    closing:
      "We don't believe in rushing through projects or hiding imperfections under fresh paint. We believe in taking the time to do things properly. That attention to detail helps create finishes that look cleaner, perform better, and last longer.",
  },
  {
    title: "Hard Work",
    intro:
      "Beautiful work takes effort. Our team takes pride in showing up prepared, working with purpose, and maintaining high standards throughout the project.",
    list: [
      "Starting on time",
      "Staying organized",
      "Solving problems proactively",
      "Finishing strong",
      "Staying accountable",
      "Continuing to improve",
    ],
    closing:
      "We also believe quality work starts with quality people. That's why we invest in training, systems, leadership, and fair compensation so we can attract and retain painters who genuinely care about craftsmanship. When homeowners hire The Proud Paintbrush, they're hiring a team that values discipline, pride, and professionalism—not shortcuts.",
  },
];

const processSteps = [
  {
    title: "Discovery & Planning",
    description:
      "We take time to understand your goals, surfaces, colors, finishes, and expectations before work begins.",
  },
  {
    title: "Thorough Surface Preparation",
    description:
      "Cleaning, sanding, patching, caulking, masking, and priming where needed help ensure long-term durability.",
  },
  {
    title: "Respect for Your Home",
    description:
      "Furniture, floors, fixtures, landscaping, and belongings are carefully protected throughout the project.",
  },
  {
    title: "High-Quality Products",
    description:
      "We use professional-grade coatings and recommend products based on durability, washability, finish quality, and long-term performance.",
  },
  {
    title: "Daily Communication",
    description:
      "You'll receive updates throughout the project so expectations remain clear and aligned.",
  },
  {
    title: "Final Walkthrough",
    description:
      "Before completion, we walk the project with you to ensure everything meets expectations and touch up any final details.",
  },
];

const faqs = [
  {
    question: "What makes The Proud Paintbrush different from other painting companies in Sugar Land?",
    answer:
      "We focus heavily on communication, preparation, craftsmanship, and long-term quality. Our company was built around care for people, attention to detail, and hard work—not rushing through projects.",
  },
  {
    question: "Why do core values matter when hiring painters?",
    answer:
      "Core values affect how a company treats customers, prepares surfaces, communicates, protects homes, and handles problems. Strong values usually lead to better customer experiences and longer-lasting results.",
  },
  {
    question: "Do your values affect pricing?",
    answer:
      "Yes. We invest heavily in quality preparation, professional systems, training, and skilled painters. While we may not always be the cheapest option, we focus on delivering better long-term value and durability.",
  },
  {
    question: "What areas do you serve?",
    answer:
      'We serve <a href="/service-areas">Sugar Land, Missouri City, Richmond, Katy, Rosenberg, Fulshear, West Houston, and Southwest Houston</a>, plus Stafford, Pearland, and surrounding Fort Bend County communities.',
  },
  {
    question: "What types of painting services do you offer?",
    answer:
      'We offer <a href="/interior-painting">interior painting</a>, <a href="/exterior-painting">exterior painting</a>, <a href="/cabinet-painting">cabinet painting</a>, <a href="/interior-painting/drywall-repair">drywall repair</a>, <a href="/exterior-painting/fence-staining">fence staining</a>, surface preparation, and related residential painting services.',
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer.replace(/<[^>]+>/g, "") },
  })),
};

export default function CoreValuesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="relative w-full h-[90vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/cv-team.jpg"
          alt="The Proud Paintbrush team — Sugar Land painting company built on core values"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Our Core Values – The Proud Paintbrush
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Built on three simple values: Care for People, Attention to Detail, and Hard Work.
          </p>
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

      {/* WHY CORE VALUES MATTER */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-6">
            Why Core Values Matter in a Painting Company
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At The Proud Paintbrush, painting has never been just about paint. It&apos;s about
            trust. It&apos;s about showing up on time, protecting someone&apos;s home,
            communicating clearly, and doing work that still looks beautiful years later—not just on
            the final walkthrough.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Hiring painters means inviting people into your home. It means trusting a company with
            your walls, cabinets, floors, furniture, schedules, and daily life. That&apos;s why
            values matter. A painting company&apos;s values affect:
          </p>
          <ul className="space-y-2 mb-6">
            {valuesAffectList.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#4B83B2] font-bold mt-0.5">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed">
            Anyone can put paint on a wall. What separates a high-quality painting company is the
            care, discipline, and standards behind the process. At The Proud Paintbrush, we believe
            homeowners deserve more than a fast paint job. They deserve a team that genuinely cares
            about the outcome.
          </p>
        </div>
      </section>

      {/* THREE CORE VALUES */}
      <WaveUp from="bg-white" to="#111111" />
      <section className="bg-[#111111] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Our Three Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value) => (
              <div key={value.title} className="bg-white/5 border border-white/10 p-6">
                <h3 className="text-xl font-bold text-[#4B83B2] mb-4">{value.title}</h3>
                <p className="text-white/70 leading-relaxed mb-4 text-sm">{value.intro}</p>
                <ul className="space-y-2 mb-4">
                  {value.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#4B83B2] font-bold mt-0.5 text-sm">✓</span>
                      <span className="text-white/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-white/60 text-sm leading-relaxed italic">{value.closing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WaveDown from="bg-[#111111]" to="#ffffff" />

      {/* HOW VALUES SHOW UP */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-12 text-center">
            How Our Values Show Up on Your Project
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <div key={step.title} className="border-l-4 border-[#4B83B2] pl-4">
                <p className="text-sm text-[#4B83B2] font-semibold mb-1">Step {i + 1}</p>
                <h3 className="text-lg font-bold text-[#111111] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-12 [&_a]:text-[#4B83B2] [&_a]:font-semibold [&_a:hover]:underline">
            Explore our <Link href="/preparation-process">preparation process</Link>, browse{" "}
            <Link href="/exterior-painting">exterior</Link> and{" "}
            <Link href="/interior-painting">interior painting</Link> services, or read real{" "}
            <Link href="/testimonials">customer reviews</Link>.
          </p>
        </div>
      </section>

      {/* PHOTO ROW */}
      <section className="bg-white pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { src: "/images/migrated/happy-homeowners-100-percent-satisfied-proud-paintbrush-west-houston-tx.webp", alt: "Happy West Houston homeowners holding a 100% satisfied sign after a painting project by The Proud Paintbrush" },
              { src: "/images/migrated/richmond-tx-happy-homeowner-bedroom-painting.webp", alt: "Satisfied Richmond homeowner holding a 100% satisfied sign after a bedroom painting project by The Proud Paintbrush" },
              { src: "/images/migrated/missouri-city-tx-happy-homeowner-interior-painting-testimonial.webp", alt: "Happy Missouri City homeowner holding a 100% satisfied sign after an interior painting project by The Proud Paintbrush" },
            ].map((img) => (
              <div key={img.src} className="relative h-64 overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover object-center" quality={90} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAINT IT FORWARD */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#111111] mb-6 text-center">
            Paint It Forward – Giving Back to the Community
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            We believe a successful company should help the community around it. That&apos;s why we
            created Paint It Forward, an initiative where we provide free painting services to
            families and individuals going through difficult circumstances. For us, serving the
            community means more than completing projects. It means helping people feel cared for in
            the place they call home.
          </p>
          <p className="text-center mt-8">
            <Link href="/paint-it-forward" className="inline-block text-[#4B83B2] font-semibold hover:underline">
              Learn more about Paint It Forward &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* FAQS */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#111111] mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <p className="font-semibold text-[#111111] mb-2">{faq.question}</p>
                <p
                  className="text-gray-600 leading-relaxed [&_a]:text-[#4B83B2] [&_a]:font-medium [&_a:hover]:underline"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLUE CTA */}
      <WaveUp from="bg-white" to="#4B83B2" />
      <section className="bg-[#4B83B2] text-white py-16 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Schedule Your Free Estimate</h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Experience the difference that care, craftsmanship, and hard work can make. Let&apos;s
          talk about your project.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-10 py-4 text-lg transition-colors"
        >
          Schedule Your Free Estimate
        </a>
      </section>
      <WaveDown from="bg-[#4B83B2]" to="#ffffff" />
      <div className="bg-white h-4" />
    </>
  );
}
