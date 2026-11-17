"use client";

import { useEffect, useRef } from "react";

/**
 * A site shown in a browser window.
 *
 * The first attempt at this drew a MacBook. It never looked like one, and
 * going to see how rauno.me, benji.org and emilkowal.ski do it explains why:
 * none of them draw hardware at all. Rauno's craft page carries 132 clips,
 * every one of them bare, no border and no radius. Benji runs the real thing
 * in an iframe inside a plain 8px clip. Francesco is the only one who frames a
 * desktop screen, and he does it with a photograph of an Apple Studio Display
 * with the UI perspective-mapped onto the glass. Aluminium is reflections and
 * edge highlights; a gradient at card size is a grey rectangle.
 *
 * So this frames the thing it actually is. The recording is a 1512 x 982
 * browser viewport, which makes browser chrome above it a description rather
 * than a costume, and it carries the domain, which is the proof the card is
 * making anyway.
 */

/** The recording's viewport, 1512 x 982. */
const VIEWPORT_RATIO = "1512 / 982";

function Lock() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-2 shrink-0 sm:size-2.5"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export default function SiteFrame({
  src,
  poster,
  alt,
  href,
  domain,
}: {
  /** An mp4 loops; anything else is treated as a still. */
  src: string;
  poster?: string;
  alt: string;
  href?: string;
  domain: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const isVideo = src.endsWith(".mp4");

  // Nothing downloads or plays until the frame is on screen, and it stops
  // again when it leaves.
  useEffect(() => {
    const el = ref.current;
    if (!el || !isVideo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = video.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "100px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isVideo]);

  const window_ = (
    <div className="overflow-hidden rounded-xl border border-[var(--foreground)]/10 bg-white shadow-[0_12px_32px_rgb(0_0_0/0.09),0_2px_6px_rgb(0_0_0/0.05)]">
      <div className="relative flex h-7 items-center border-b border-[var(--foreground)]/[.07] bg-[#f6f6f7] px-3 sm:h-9 sm:px-3.5">
        <span aria-hidden className="flex items-center gap-1 sm:gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <i
              key={c}
              className="block size-1.5 rounded-full sm:size-2.5"
              style={{ background: c }}
            />
          ))}
        </span>
        {/* Centred on the bar, not on what is left of it after the lights. */}
        <span className="absolute left-1/2 flex max-w-[60%] -translate-x-1/2 items-center gap-1 rounded-full bg-[var(--foreground)]/[.055] px-2 py-[3px] text-[9px] text-[var(--foreground)]/50 sm:gap-1.5 sm:px-2.5 sm:text-[11px]">
          <Lock />
          <span className="truncate">{domain}</span>
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden bg-white"
        style={{ aspectRatio: VIEWPORT_RATIO }}
      >
        {isVideo ? (
          <video
            ref={video}
            src={src}
            poster={poster}
            aria-label={alt}
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>
    </div>
  );

  return (
    <div ref={ref} className="w-full">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={alt}
          className="block transition-transform duration-300 ease-out hover:-translate-y-0.5"
        >
          {window_}
        </a>
      ) : (
        window_
      )}
    </div>
  );
}
