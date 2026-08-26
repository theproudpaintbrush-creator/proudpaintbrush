export type FaqItem = { q: string; a: string };

// Visible FAQ Q&A block. Shared by ContentPage (opt-in `showFaqs`) and bespoke
// pages. Does NOT emit schema itself — the FAQPage JSON-LD is built separately
// by the route from the same `faqs` array so there is one source of truth.
export default function FaqSection({ heading = "Frequently Asked Questions", faqs }: { heading?: string; faqs: FaqItem[] }) {
  if (!faqs.length) return null;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] text-center mb-10">{heading}</h2>
      <div className="space-y-5">
        {faqs.map((faq) => (
          <div key={faq.q} className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
            <h3 className="font-bold text-[#1a2e44] mb-2 text-lg">{faq.q}</h3>
            <p className="text-gray-700 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
