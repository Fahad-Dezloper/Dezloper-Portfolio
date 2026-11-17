"use client";

import { useEffect, useRef } from "react";

export type PhoneClip = {
  src: string;
  poster: string;
  /** What the screen is doing, for anyone who cannot watch it. */
  alt: string;
};

/**
 * The clips are cropped to the device body itself: 848 x 1828 of the 928 x 1908
 * render. What came off was the render's own drop shadow, and the video's
 * square edge was slicing straight through it — a pale rectangle on a white
 * page, with the shadow stopping dead at its border.
 *
 * Cropping to the body leaves four small corners of background outside the
 * device's rounded edge, so the box is rounded by exactly the radius the
 * render was drawn with: 128px on a body 848 wide and 1828 tall. Percentages,
 * because a border-radius percentage resolves against the box's own width and
 * height, and so survives every size the row is shown at.
 */
const PHONE_RATIO = "848 / 1828";
const PHONE_RADIUS = "15.09% / 7%";

/**
 * A row of phones running their own loop, after the showcase on
 * francescomusso.com.
 *
 * His is a device-body PNG laid over the moving content at z-10, with the
 * content inset to the screen cut-out (`inset: .9% 2.25%`, rounded
 * `13.5% / 6.45%`). Ours needs none of that: the clips are exported with the
 * body, the Dynamic Island, the home indicator and a white page behind them
 * already in frame, and this page is white, so the render is the mockup. A
 * second frame drawn in CSS would sit outside the one already in the picture.
 *
 * What is added here is what a video tag does not do on its own: nothing
 * downloads or plays until the row is actually on screen, and it stops again
 * when it leaves. Three clips looping behind the fold is work no one is
 * watching.
 */
export default function PhoneRow({
  clips,
  label,
}: {
  clips: PhoneClip[];
  label: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        videos.current.forEach((video) => {
          if (!video) return;
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      // A little of the row is enough: they should already be running by the
      // time they are worth looking at.
      { rootMargin: "100px", threshold: 0.15 },
    );
    io.observe(row);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      role="group"
      aria-label={label}
      // Wider than the text column it sits in, and still centred on it: three
      // phones at the width of the prose would be thumbnails.
      className="grid grid-cols-3 gap-3 sm:gap-5 md:-mx-12 md:gap-7 lg:-mx-32 lg:gap-12"
    >
      {clips.map((clip, i) => (
        <div
          key={clip.src}
          // isolate, because Safari has a long history of letting video escape
          // a rounded parent without its own stacking context.
          className="mx-auto isolate w-full max-w-[280px] overflow-hidden"
          style={{
            aspectRatio: PHONE_RATIO,
            borderRadius: PHONE_RADIUS,
            // The lift the baked shadow used to give, drawn by the browser
            // against the device's shape instead of a rectangle around it, so
            // it fades out into the page rather than stopping at an edge.
            boxShadow: "0 10px 24px rgb(0 0 0 / 0.10), 0 2px 6px rgb(0 0 0 / 0.06)",
          }}
        >
          <video
            ref={(el) => {
              videos.current[i] = el;
            }}
            src={clip.src}
            poster={clip.poster}
            aria-label={clip.alt}
            muted
            loop
            playsInline
            preload="none"
            className="block h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
