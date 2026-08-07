import type { Metadata } from "next";
import Image from "next/image";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, REVIEW_URL, SITE_URL } from "@/lib/site";
import LiteYouTube from "@/components/LiteYouTube";
import Configurator from "./Configurator";

// Private client presentation — must never surface in search results or link
// previews (no OpenGraph/Twitter cards either, so pasting the link elsewhere
// doesn't leak the client's name/address into a rich preview).
export const metadata: Metadata = {
  title: "Your Estimate | The Proud Paintbrush",
  robots: { index: false, follow: false },
};

const PROMISES = [
  { title: "Surface Prep", detail: "Furniture moved & protected. Drop cloths on all floors." },
  { title: "Crack & Hole Filling", detail: "All holes filled, caulked, and sanded smooth." },
  { title: "Two Full Coats", detail: "Two complete coats on every surface — no shortcuts." },
  { title: "Crisp Edges", detail: "Clean cut-in at every ceiling line, baseboard, and frame." },
  { title: "Daily Tidy-Up", detail: "Job site left clean every day." },
  { title: "Final Walk-Through", detail: "We walk every room with you. Done when you say it is." },
];

// Real customer videos from lib/testimonialVideos.ts's interior-matched set —
// the most relevant proof for a whole-home interior repaint like this one.
const PROOF_VIDEOS = [
  { youtubeId: "zT_z3yxJcL0", label: "Karmyn · Interior Repaint" },
  { youtubeId: "shzynACJsEw", label: "Kerry · Full Interior" },
  { youtubeId: "4K_j8zfo2zQ", label: "The Olsons · Interior" },
];

const BADGES = [
  "PCA Accredited",
  "Fort Bend Chamber",
  "Fully insured — certificate available on request",
  "Written workmanship warranty on every project",
];

const FAQS = [
  {
    question: "Who will be in my home?",
    answer:
      "A uniformed Proud Paintbrush crew, led by a named crew lead. Every team member is background-checked, and you'll have a single point of contact throughout your project.",
  },
  {
    question: "How is my home protected?",
    answer:
      "We fully mask windows, trim, and fixtures, protect every floor, move and cover your furniture, and clean up the job site every day before we leave.",
  },
  {
    question: "What paint do you use?",
    answer:
      "Sherwin-Williams, throughout. Your finish level sets the exact product line — SuperPaint, Duration, or Emerald.",
  },
  {
    question: "What if something isn't right?",
    answer:
      "We fix it. Every project is backed by a written warranty, and we don't collect final payment until after you've walked the job with us and signed off.",
  },
  {
    question: "How does scheduling work?",
    answer: "A $500 deposit holds your start date. We confirm your start and completion dates before any work begins.",
  },
  {
    question: "How do payments work?",
    answer:
      "A deposit to reserve your date, then the balance at completion after your walk-through. 0% financing over 25 months is available if you'd like to spread out the cost.",
  },
  {
    question: "Can I change my mind?",
    answer: "Yes — you have a 3-day right to cancel after signing, with no loss of your deposit.",
  },
];

// Fixed proposal date (not "today") so the page reads the same every time it's
// reopened — the 30-day validity window is measured from when it was prepared.
const PROPOSAL_DATE = new Date(2026, 7, 7);
const VALID_THROUGH = new Date(PROPOSAL_DATE.getTime() + 30 * 24 * 60 * 60 * 1000);
const dateFmt = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function MichaelEstimatePage() {
  return (
    <div className="pb-44 sm:pb-32">
      {/* 1. HERO */}
      <section className="bg-[#1a2e44] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Image
              src="/images/logo-footer.png"
              alt="The Proud Paintbrush logo"
              width={160}
              height={58}
              className="h-12 w-auto shrink-0 self-start"
              priority
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Your Personalized Estimate
              </p>
              <h1 className="text-xl sm:text-2xl font-bold">
                Prepared for Michael <span className="text-white/50 font-normal">·</span> 13515 Westport Ln
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70 border-t border-white/10 pt-4">
            <span>Prepared {dateFmt(PROPOSAL_DATE)}</span>
            <span className="text-white/30">·</span>
            <span>Pricing valid for 30 days — through {dateFmt(VALID_THROUGH)}</span>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center font-bold text-sm"
              aria-hidden
            >
              CP
            </span>
            <p className="text-sm text-white/80">
              Prepared personally by <span className="font-semibold text-white">Chris Petkau, Owner</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE WORK — included in every option */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#3A6A96] mb-1">The Work</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] mb-6">Included in every option</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROMISES.map((p) => (
              <div key={p.title} className="rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full bg-[#3A6A96] text-white flex items-center justify-center text-xs"
                    aria-hidden
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-bold text-[#1a2e44]">{p.title}</span>
                </div>
                <p className="text-sm text-gray-600">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE CONFIGURATOR — the only interactive part of the page */}
      <Configurator />

      {/* 4. FINANCING */}
      <section className="bg-[#3A6A96] text-white py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">0% interest. 25 equal monthly payments.</h2>
          <p className="text-white/90 leading-relaxed mb-6">
            Through our partnership with Synchrony Bank, split your project into 25 equal payments with zero
            interest. Checking if you prequalify takes about 60 seconds and has no impact to your credit score.
          </p>
          <a
            // TODO(synchrony-link): replace "#" with Michael's real Synchrony prequalify link.
            href="#"
            className="inline-block bg-white text-[#3A6A96] hover:bg-[#1a2e44] hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Check if you prequalify
          </a>
          <p className="text-xs text-white/60 mt-5 max-w-lg mx-auto">
            *Promotional financing through Synchrony Bank. Subject to credit approval. Minimum monthly payments
            required. See store for details.
          </p>
        </div>
      </section>

      {/* 5. PROOF */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity"
          >
            <span className="text-yellow-500 text-lg tracking-tight" aria-hidden>★★★★★</span>
            <span className="font-bold text-[#1a2e44]">5.0 on Google</span>
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {PROOF_VIDEOS.map((v) => (
              <div key={v.youtubeId}>
                <div className="relative aspect-video w-full overflow-hidden bg-black rounded-lg">
                  <LiteYouTube id={v.youtubeId} label={v.label} />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">{v.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {BADGES.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-[#1a2e44]"
              >
                <svg className="w-4 h-4 text-[#3A6A96] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT */}
      <section className="bg-[#f8f9fa] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-72 lg:h-96 overflow-hidden rounded-lg order-2 lg:order-1">
            <Image
              src="/images/story-family-1.jpg"
              alt="Chris Petkau and family, the heart of The Proud Paintbrush"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              quality={90}
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#3A6A96] mb-1">About</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] mb-4">Take Pride In Your Home</h2>
            <p className="text-gray-600 leading-relaxed">
              Chris Petkau grew up in Vancouver, Canada, where his father ran a concrete business —
              construction was in his blood from day one. He moved to the U.S. in 2007, and in 2020, amid the
              uncertainty of COVID, he and his wife Sarah started a new chapter in Sugar Land. That same year,
              The Proud Paintbrush was born, right alongside one of the hardest seasons of their lives — the
              difficult journey through infertility and IVF. It strengthened their faith and their
              commitment to building something lasting. Today, Chris and Sarah are proud parents to Isaac and
              Sammy, and that family foundation still drives every project we take on — the same care and
              pride we&apos;d want in our own home.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ — plain <details>/<summary>, no JS required */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] mb-6 text-center">
            Every question, answered
          </h2>
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[#1a2e44]">
                  {faq.question}
                  <svg
                    className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER (page-specific — separate from the sitewide footer) */}
      <section className="bg-[#1a2e44] text-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-sm text-white/70">
            A $500 deposit reserves your start date. You have a 3-day right to cancel without losing your
            deposit.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={`tel:${PHONE_TEL}`} className="text-white hover:text-white/80 font-semibold">
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="text-white hover:text-white/80 font-semibold">
              {EMAIL}
            </a>
            <span className="text-white/70">Sugar Land, TX 77498</span>
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 font-semibold"
            >
              theproudpaintbrush.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
