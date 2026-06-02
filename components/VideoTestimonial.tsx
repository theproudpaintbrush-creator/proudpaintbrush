import Image from "next/image";
import LiteYouTube from "./LiteYouTube";

export type VideoTestimonialProps = {
  variant: "featured" | "authentic";
  youtubeId: string;
  posterImage?: string;
  customerName?: string;
  customerNeighborhood?: string;
  city?: string;
  className?: string;
};

const TODO_PREFIX = "TODO_";

function isPlaceholder(id: string) {
  return !id || id.startsWith(TODO_PREFIX);
}

function FeaturedVideo({
  youtubeId,
  posterImage,
  customerName,
  customerNeighborhood,
  city,
}: Omit<VideoTestimonialProps, "variant" | "className">) {
  const placeholder = isPlaceholder(youtubeId);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative aspect-video w-full overflow-hidden bg-black shadow-2xl">
        {placeholder ? (
          posterImage ? (
            <>
              <Image src={posterImage} alt={`${customerName ?? "Customer"} video testimonial poster`} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                  <div
                    className="w-0 h-0 ml-1"
                    style={{ borderLeft: "18px solid #111111", borderTop: "11px solid transparent", borderBottom: "11px solid transparent" }}
                  />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/60">
                Video placeholder · {youtubeId}
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1f2937] to-[#111111] text-white/70 text-sm text-center px-6">
              Featured video testimonial — replace <code className="text-white/90 font-mono">{youtubeId}</code> in cities.ts with the YouTube ID.
            </div>
          )
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
            title={`${customerName ?? "Customer"} video testimonial${city ? ` — ${city}` : ""}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
      {(customerName || customerNeighborhood) && (
        <p className="text-center text-white/80 text-sm mt-4">
          {customerName}
          {customerNeighborhood ? ` — ${customerNeighborhood}` : ""}
        </p>
      )}
    </div>
  );
}

function AuthenticGridItem({ youtubeId, customerNeighborhood, city }: Omit<VideoTestimonialProps, "variant" | "className">) {
  const placeholder = isPlaceholder(youtubeId);
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {placeholder ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 text-xs text-center px-3 gap-2">
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
            <div
              className="w-0 h-0 ml-0.5"
              style={{ borderLeft: "10px solid white", borderTop: "7px solid transparent", borderBottom: "7px solid transparent" }}
            />
          </div>
          <span className="font-mono text-[10px] opacity-70">{youtubeId}</span>
        </div>
      ) : (
        <LiteYouTube
          id={youtubeId}
          label={`Customer testimonial${customerNeighborhood ? ` from ${customerNeighborhood}` : ""}${city ? ` — ${city}` : ""}`}
        />
      )}
    </div>
  );
}

export default function VideoTestimonial(props: VideoTestimonialProps) {
  if (props.variant === "featured") {
    return (
      <div className={props.className}>
        <FeaturedVideo {...props} />
      </div>
    );
  }
  return (
    <div className={props.className}>
      <AuthenticGridItem {...props} />
    </div>
  );
}

export function AuthenticVideoGrid({
  videos,
  city,
  className,
}: {
  videos: Array<Omit<VideoTestimonialProps, "variant" | "className"> & { variant?: VideoTestimonialProps["variant"] }>;
  city?: string;
  className?: string;
}) {
  if (!videos?.length) return null;
  // Adapt columns to count so 1–2 videos stay centered instead of left-aligning
  // against an empty third column.
  const colClass =
    videos.length === 1
      ? "sm:grid-cols-1 max-w-md mx-auto"
      : videos.length === 2
        ? "sm:grid-cols-2 max-w-3xl mx-auto"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 ${colClass} gap-4 ${className ?? ""}`}>
      {videos.map((v) => (
        <AuthenticGridItem key={v.youtubeId} {...v} city={city} />
      ))}
    </div>
  );
}
