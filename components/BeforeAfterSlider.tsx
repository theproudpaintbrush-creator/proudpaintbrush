"use client";

import { useCallback, useRef, useState } from "react";

type Img = { src: string; alt: string };

export default function BeforeAfterSlider({
  before,
  after,
  aspect = "3 / 4",
}: {
  before: Img;
  after: Img;
  aspect?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div
        ref={ref}
        className="relative w-full select-none overflow-hidden rounded-xl shadow-md cursor-ew-resize touch-none"
        style={{ aspectRatio: aspect }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
        }}
      >
        {/* AFTER (full) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after.src}
          alt={after.alt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          loading="lazy"
        />
        {/* BEFORE (clipped from the right edge inward) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before.src}
          alt={before.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
          loading="lazy"
        />

        {/* labels */}
        <span className="absolute top-3 left-3 bg-[#1a2e44]/90 text-white text-xs font-bold px-2.5 py-1 rounded">
          BEFORE
        </span>
        <span className="absolute top-3 right-3 bg-[#4B83B2]/90 text-white text-xs font-bold px-2.5 py-1 rounded">
          AFTER
        </span>

        {/* divider + handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_6px_rgba(0,0,0,0.4)] pointer-events-none"
          style={{ left: `calc(${pos}% - 2px)` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#1a2e44] text-sm font-bold">
            &#8596;
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-3">Drag the slider to see the before &amp; after.</p>
    </div>
  );
}
