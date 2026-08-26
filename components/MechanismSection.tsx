// Single "why this is hard here" explainer (climate, mechanism, etc.). Shared
// by ContentPage (opt-in `mechanismSection` block) and bespoke pages.
export default function MechanismSection({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] text-center mb-6">{heading}</h2>
      <p className="text-gray-700 leading-relaxed text-lg">{body}</p>
    </div>
  );
}
