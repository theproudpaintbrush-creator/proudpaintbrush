"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Lightweight, performance-friendly YouTube embed ("facade").
 * Renders only the video thumbnail until the user clicks play, then swaps in
 * the real iframe. This lets us show many testimonial videos on one page
 * without loading dozens of YouTube players up front (protects Core Web Vitals).
 */
export default function LiteYouTube({ id, label }: { id: string; label: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${id}?rel=0&autoplay=1`}
        title={label}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${label}`}
      className="group absolute inset-0 w-full h-full cursor-pointer"
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={label}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-110">
          <span
            className="ml-1 h-0 w-0"
            style={{
              borderLeft: "16px solid #111111",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
            }}
          />
        </span>
      </span>
    </button>
  );
}
