import Image from "next/image";

export type GalleryItem = { src: string; alt: string; caption?: string };

// Responsive project-photo gallery for the service hubs. Real finished-work
// photos with descriptive, geo-tagged alt text (image SEO + visual proof).
export default function ProjectGallery({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro?: string;
  items: GalleryItem[];
}) {
  if (!items?.length) return null;
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-4">{heading}</h2>
        {intro && (
          <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-12">{intro}</p>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <figure key={item.src} className="group relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={82}
              />
              {item.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
