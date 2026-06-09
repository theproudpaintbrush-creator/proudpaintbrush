import Image from "next/image";

export type CustomerPhotoGridProps = {
  photos: { src: string; alt: string }[];
  city?: string;
  heading?: string;
  subheading?: string;
};

function isPlaceholder(src: string) {
  return src.includes("TODO_");
}

export default function CustomerPhotoGrid({ photos, city, heading, subheading }: CustomerPhotoGridProps) {
  const realPhotos = (photos ?? []).filter((p) => !isPlaceholder(p.src));
  if (!realPhotos.length) return null;

  return (
    <div className="max-w-6xl mx-auto px-4">
      {(heading || subheading) && (
        <div className="text-center mb-10">
          {heading && (
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-3">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {realPhotos.map((photo, idx) => {
          const placeholder = isPlaceholder(photo.src);
          return (
            <figure
              key={`${photo.src}-${idx}`}
              className="relative aspect-[4/3] overflow-hidden bg-gray-100"
            >
              {placeholder ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 text-xs text-center px-4">
                  <div>
                    <div className="font-semibold mb-1">Customer photo placeholder</div>
                    <div className="font-mono opacity-70 break-all">
                      {photo.src.split("/").pop()}
                    </div>
                    {city && <div className="mt-2 text-[10px] uppercase tracking-wide">{city}</div>}
                  </div>
                </div>
              ) : (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export function BeforeAfterGrid({
  pairs,
  city,
}: {
  pairs: { before: { src: string; alt: string }; after: { src: string; alt: string } }[];
  city?: string;
}) {
  const realPairs = (pairs ?? []).filter(
    (p) => !isPlaceholder(p.before.src) && !isPlaceholder(p.after.src)
  );
  if (!realPairs.length) return null;
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="space-y-10">
        {realPairs.map((pair, idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BeforeAfterImage label="Before" img={pair.before} city={city} />
            <BeforeAfterImage label="After" img={pair.after} city={city} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterImage({ label, img, city }: { label: "Before" | "After"; img: { src: string; alt: string }; city?: string }) {
  const placeholder = isPlaceholder(img.src);
  return (
    <figure className="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <div className="absolute top-3 left-3 z-10 bg-[#111111] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider">
        {label}
      </div>
      {placeholder ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 text-xs text-center px-4">
          <div>
            <div className="font-semibold mb-1">{label} photo placeholder</div>
            <div className="font-mono opacity-70 break-all">{img.src.split("/").pop()}</div>
            {city && <div className="mt-2 text-[10px] uppercase tracking-wide">{city}</div>}
          </div>
        </div>
      ) : (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      )}
    </figure>
  );
}
