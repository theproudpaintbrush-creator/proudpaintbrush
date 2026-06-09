"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const allTestimonialPhotos = [
  { src: "/images/interior-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy customer — interior painting in Sugar Land, TX" },
  { src: "/images/interior-painting-project-happy-customer-sugar-land-tx.jpg", alt: "Happy customer after interior painting project in Sugar Land, TX" },
  { src: "/images/commercial-interior-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy customer — commercial interior painting in Sugar Land, TX" },
  { src: "/images/commerical-interior-painting-happy-customer-west-houston.jpg", alt: "Happy customer — commercial interior painting in West Houston" },
  { src: "/images/exterior-home-painting-happy-customers-sugar-land-tx.jpg", alt: "Happy customers after exterior home painting in Sugar Land, TX" },
  { src: "/images/exterior-house-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy customer after exterior house painting in Sugar Land, TX" },
  { src: "/images/exterior-painting-happy-customer-richmond-tx.jpg", alt: "Happy customer after exterior painting in Richmond, TX" },
  { src: "/images/exterior-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy customer after exterior painting in Sugar Land, TX" },
  { src: "/images/luxury-home-exterior-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy customers after luxury home exterior painting in Sugar Land, TX" },
  { src: "/images/fence-staining-happy-customer-sugar-land-tx.jpg", alt: "Happy customer after fence staining in Sugar Land, TX" },
  { src: "/images/garage-door-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy customer after garage door painting in Sugar Land, TX" },
  { src: "/images/happy-customer-cabinet-painting-katy-tx.jpg", alt: "Happy customer after cabinet painting in Katy, TX" },
  { src: "/images/happy-customer-exterior-brick-painting-katy-tc.jpg", alt: "Happy customer after exterior brick painting in Katy, TX" },
  { src: "/images/happy-customer-fulshear-tx-door-refinishing.jpg", alt: "Happy customer after door refinishing in Fulshear, TX" },
  { src: "/images/happy-customers-the-proud-paintbrush-sugar-land-tx.jpg", alt: "Happy customers — The Proud Paintbrush in Sugar Land, TX" },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Respect users who prefer reduced motion: don't auto-advance for them.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % allTestimonialPhotos.length);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  const getPhoto = (offset: number) =>
    allTestimonialPhotos[(current + offset) % allTestimonialPhotos.length];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Desktop: 6 across */}
      <div className="hidden lg:grid grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => {
          const photo = getPhoto(i);
          return (
            <div key={i} className="aspect-square overflow-hidden">
              <Image src={photo.src} alt={photo.alt} width={300} height={300}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" quality={85} />
            </div>
          );
        })}
      </div>
      {/* Mobile: 2 across */}
      <div className="grid lg:hidden grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => {
          const photo = getPhoto(i);
          return (
            <div key={i} className="aspect-square overflow-hidden">
              <Image src={photo.src} alt={photo.alt} width={300} height={300}
                className="w-full h-full object-cover" quality={85} />
            </div>
          );
        })}
      </div>
      {/* Dots */}
      <div className="flex flex-wrap justify-center gap-1 mt-5">
        {allTestimonialPhotos.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className="p-2 flex items-center justify-center"
            aria-label={`Go to photo ${i + 1}`}>
            <span className={`block w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[#3A6A96]" : "bg-gray-300"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
