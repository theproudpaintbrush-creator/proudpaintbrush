const STEPS = [
  { n: "1", title: "Honest Walkthrough & Written Estimate", desc: "We assess your project in person and put the full scope — colors, products, prep, and timeline — in writing. No vague numbers, no surprises." },
  { n: "2", title: "Protect Everything", desc: "Floors, furniture, fixtures, and landscaping are covered and masked before a drop of paint is opened." },
  { n: "3", title: "Prep-First — the step others skip", desc: "Cleaning, sanding, repairs, caulking, and priming. This is where a lasting finish is won or lost, and it's where we never cut corners." },
  { n: "4", title: "Precision Application", desc: "Even coats applied with the right tools and technique — crisp lines, no lap marks, no flashing." },
  { n: "5", title: "Daily Cleanup & Final Walkthrough", desc: "We clean up every day and walk the finished project with you. It's not done until you're proud of it — backed by our written warranty." },
];

export default function ProudProcess() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#3A6A96] mb-2">How We Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-3">The Proud Process</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A repeatable, prep-first system built so the finish still looks great years later — not just on day one.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-white border border-gray-200 p-6">
              <div className="w-9 h-9 bg-[#3A6A96] text-white rounded-full flex items-center justify-center font-bold mb-3">{s.n}</div>
              <h3 className="font-bold text-[#111111] mb-2 text-sm leading-snug">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
