const STEPS = [
  {
    n: "1",
    title: "Honest Walkthrough & Written Estimate",
    desc: "We assess your project in person and put the full scope — colors, products, prep, and timeline — in writing. No vague numbers, no surprises.",
    icon: (
      <path d="M9 12h6M9 16h6M9 8h3M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    ),
  },
  {
    n: "2",
    title: "Protect Everything",
    desc: "Floors, furniture, fixtures, and landscaping are covered and masked before a drop of paint is opened.",
    icon: <path d="M12 3 4 6v6c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V6l-8-3Z" />,
  },
  {
    n: "3",
    title: "Prep-First — the step others skip",
    desc: "Cleaning, sanding, repairs, caulking, and priming. This is where a lasting finish is won or lost, and it's where we never cut corners.",
    icon: <path d="m5 16 8-8 3 3-8 8H5v-3ZM14 7l2.5-2.5a1.5 1.5 0 0 1 2 2L16 9" />,
    featured: true,
  },
  {
    n: "4",
    title: "Precision Application",
    desc: "Even coats applied with the right tools and technique — crisp lines, no lap marks, no flashing.",
    icon: <path d="M4 21c1-4 2-6 5-9M9 12l7-7 3 3-7 7-4 1 1-4Z" />,
  },
  {
    n: "5",
    title: "Daily Cleanup & Final Walkthrough",
    desc: "We clean up every day and walk the finished project with you. It's not done until you're proud of it — backed by our written warranty.",
    icon: <path d="m5 13 4 4L19 7" />,
  },
];

export default function ProudProcess() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#3A6A96]/10 blur-3xl"
      />
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#3A6A96] mb-3">How We Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-3">The Proud Process</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A repeatable, prep-first system built so the finish still looks great years later — not just on day one.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#3A6A96]/30 to-transparent"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className={`group relative flex flex-col rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#3A6A96]/10 ${
                  s.featured
                    ? "bg-gradient-to-b from-[#3A6A96]/[0.06] to-white ring-2 ring-[#3A6A96]/40"
                    : "bg-white ring-gray-900/5"
                }`}
              >
                {s.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#3A6A96] px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                    The step others skip
                  </span>
                )}
                <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3A6A96] to-[#1a2e44] text-white shadow-md shadow-[#3A6A96]/30 ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    {s.icon}
                  </svg>
                  <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#3A6A96] ring-1 ring-[#3A6A96]/30">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-bold text-[#111111] mb-2 text-sm leading-snug">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
