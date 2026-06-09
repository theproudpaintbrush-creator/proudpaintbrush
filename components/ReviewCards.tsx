import type { Review } from "@/lib/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-400 text-base tracking-tight" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(Math.round(rating))}
    </span>
  );
}

// Written-review cards. Renders nothing when there are no reviews, so it is safe
// to mount before reviews.json is fully populated.
export default function ReviewCards({
  reviews,
  heading,
  intro,
  columns = 3,
  dark = false,
  masonry = false,
}: {
  reviews: Review[];
  heading?: string;
  intro?: string;
  columns?: 2 | 3;
  dark?: boolean;
  // masonry packs uneven-length reviews into balanced columns (no row gaps)
  masonry?: boolean;
}) {
  if (!reviews?.length) return null;

  const colClass = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  const cardClass = dark
    ? "bg-white/5 border-white/10 text-white"
    : "bg-gray-50 border-gray-200 text-[#111111]";
  const wrapperClass = masonry
    ? "columns-1 sm:columns-2 lg:columns-3 gap-5"
    : `grid grid-cols-1 ${colClass} gap-5`;

  return (
    <div className="max-w-6xl mx-auto px-4">
      {heading && (
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-3 ${dark ? "text-white" : "text-[#111111]"}`}>
          {heading}
        </h2>
      )}
      {intro && (
        <p className={`text-center max-w-2xl mx-auto mb-10 ${dark ? "text-white/70" : "text-gray-600"}`}>
          {intro}
        </p>
      )}
      <div className={wrapperClass}>
        {reviews.map((r, i) => (
          <figure
            key={`${r.author}-${i}`}
            className={`border p-6 ${cardClass} ${masonry ? "break-inside-avoid mb-5 w-full" : "flex flex-col"}`}
          >
            <Stars rating={r.rating} />
            <blockquote className={`mt-3 mb-4 leading-relaxed ${masonry ? "" : "flex-1"} ${dark ? "text-white/90" : "text-gray-700"}`}>
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <figcaption className="text-sm font-semibold">
              {r.author}
              {(r.neighborhood || r.city) && (
                <span className={`block font-normal text-xs mt-0.5 ${dark ? "text-white/70" : "text-gray-600"}`}>
                  {[r.neighborhood, r.city].filter(Boolean).join(", ")}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
