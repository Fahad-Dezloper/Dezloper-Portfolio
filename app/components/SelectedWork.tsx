"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Gallery, { type Compare, type Slide } from "./Gallery";
import SiteFrame from "./SiteFrame";
import PhoneRow, { type PhoneClip } from "./PhoneRow";
import { intro } from "./intro";

function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-up-right size-3 inline -translate-y-2 translate-x-0.5 md:opacity-80 scale-60 group-hover:scale-100 group-hover:opacity-100 transition-[opacity,scale] origin-bottom-left ease-out"
      aria-hidden="true"
    >
      <path d="M7 7h10v10"></path>
      <path d="M7 17 17 7"></path>
    </svg>
  );
}

/**
 * A short notice over the page, for a control that has somewhere to go but
 * nowhere to go yet. It is deliberately a dead end with one way out: saying
 * nothing on a click reads as a broken button.
 */
function Notice({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timing = { duration: 220, easing: "cubic-bezier(.2,.8,.25,1)" };
    backdropRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], timing);
    cardRef.current?.animate(
      [
        { opacity: 0, transform: "scale(.94)" },
        { opacity: 1, transform: "none" },
      ],
      timing,
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label={message}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/55"
      />
      <div
        ref={cardRef}
        className="relative flex w-full max-w-xs flex-col gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-2xl"
      >
        <p className="text-[15px] leading-relaxed text-[var(--foreground)]">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="self-end rounded-full border border-[var(--foreground)]/10 px-3.5 py-1.5 text-sm text-secondary transition-colors hover:border-[var(--foreground)]/25 hover:text-[var(--foreground)]"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body,
  );
}

type Point = { value: string; label: string };

type Work = {
  id: string;
  title: string;
  /** Who it was for and when. Independent redesigns say so, on purpose. */
  meta?: string;
  desc: string;
  /** Each project keeps the shape of its own medium rather than being cropped
   *  to a shared one. Phone rows carry their own, so they leave this unset. */
  aspect?: string;
  /** Width over height of `slides`, for sizing the zoomed frame. */
  ratio?: number;
  image?: string;
  video?: string;
  slides?: Slide[];
  /** Phone screens, each running its own loop. */
  phones?: PhoneClip[];
  /** A site shown on a laptop screen. An mp4 loops; a still just sits there. */
  preview?: { src: string; poster?: string; alt: string };
  gallery?: Compare;
  compare?: { before: string; after: string };
  points?: Point[];
  links?: { href: string; label: string }[];
  note?: string;
  /** The write-up behind the work: why it was done this way, and what it cost.
   *  None of them are written yet, so for now this is what the button says
   *  instead. It becomes an href once a page exists. */
  thesis?: string;
  /** Work that is live needs no write-up to stand behind it: the row offers
   *  the thing itself instead. */
  visit?: { href: string; label: string };
};

const work: Work[] = [
  {
    id: "phoenix",
    title: "Phoenix Redesign",
    desc: "The biggest perpetual futures exchange on a fully on-chain order book, on Solana.",
    thesis: "Thesis coming soon for Phoenix.",
    aspect: "aspect-video",
    ratio: 16 / 9,
    // A trading screen is too dense to judge whole, so the comparison is
    // offered a panel at a time. The nav bar is left out: it was not the
    // problem, and nothing is served by pretending it changed.
    gallery: {
      before: "/work/_web/phoenix-old.webp",
      after: "/work/_web/phoenix-new.webp",
      ratio: 1.6,
      sections: [
        { id: "full", label: "Whole screen", x: 0, y: 0, w: 1, h: 1 },
        // The redesign carries an extra row at the top, so the panels below it
        // all sit lower than today's. Each section says where the same panel
        // starts on the old screen, or the two halves would not line up.
        {
          id: "chart",
          label: "Chart and order book",
          x: 0.004,
          y: 0.145,
          w: 0.771,
          h: 0.57,
          from: { x: 0.004, y: 0.11 },
        },
        {
          id: "order",
          label: "Order panel",
          x: 0.7745,
          y: 0.145,
          w: 0.2164,
          h: 0.8,
          from: { x: 0.7773, y: 0.073 },
        },
      ],
    },
    slides: [
      { type: "image", src: "/work/_web/phoenix-1.webp", alt: "Phoenix trade screen, top left" },
      {
        type: "video",
        src: "/work/_web/phoenix-2.mp4",
        poster: "/work/_web/phoenix-2.webp",
        alt: "Take profit and stop loss dragged on the chart",
      },
      { type: "image", src: "/work/_web/phoenix-3.webp", alt: "The full Phoenix trade screen" },
      { type: "image", src: "/work/_web/phoenix-4.webp", alt: "Phoenix trade screen, bottom right" },
    ],
  },
  {
    id: "backpack",
    title: "Backpack Futures",
    // Backpack's own figures, from the CFTC approval release of 16 Nov 2026:
    // "serves users from over 150 countries and regions with more than $450
    // billion in trading volume". The equity perps and shared collateral are
    // from its own listing announcements.
    desc: "Perpetual futures on crypto and US equities, cross-margined, with $450B traded across 150+ countries. All of it on a phone.",
    thesis: "Thesis coming soon for Backpack.",
    // One screen per claim in the sentence above, left to right.
    phones: [
      {
        src: "/work/_web/backpack-1.mp4",
        poster: "/work/_web/backpack-1.webp",
        alt: "The chart pulled open to fill the screen",
      },
      {
        src: "/work/_web/backpack-2.mp4",
        poster: "/work/_web/backpack-2.webp",
        alt: "The order written in a sheet over the chart",
      },
      {
        src: "/work/_web/backpack-3.mp4",
        poster: "/work/_web/backpack-3.webp",
        alt: "Take profit and stop loss dragged on the chart",
      },
    ],
  },
  {
    id: "fft",
    title: "Food For Thought Fest",
    desc: "Designed for one of the biggest food festivals in India, created by the South Asian Association for Gastronomy.",
    visit: { href: "https://foodforthoughtfest.in/", label: "Live site" },
    // The live page itself, recorded off Chrome at the resolution of the
    // screen it is drawn on: the load animation, then its hero video, looping.
    preview: {
      src: "/work/_web/fft-live.mp4",
      poster: "/work/_web/fft-live.webp",
      alt: "The Food For Thought Fest site, live",
    },
  },
];

export default function SelectedWork() {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [notice, setNotice] = useState<string | null>(null);

  const play = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  // Pause only, so the clip doesn't snap back to frame 0 mid fade-out.
  const pause = (id: string) => videoRefs.current[id]?.pause();

  return (
    <section className="w-full pt-[56px] md:pt-[80px] max-w-none self-stretch">
      <div className="mx-auto max-w-xl px-4 md:px-0">
        <h2 className="mb-10" {...intro(3)}>
          Selected Work
        </h2>

        <div className="flex flex-col gap-16">
          {work.map((item, index) => (
            <article
              key={item.id}
              id={item.id}
              className="flex flex-col gap-4 scroll-mt-24"
              {...intro(4 + index)}
            >
              {item.preview ? (
                // Wider than the prose it sits under, and still centred on it,
                // the way the phone row is.
                <div className="md:-mx-12 lg:-mx-32">
                  <SiteFrame
                    {...item.preview}
                    href={item.visit?.href}
                    domain="foodforthoughtfest.in"
                  />
                </div>
              ) : item.phones ? (
                <PhoneRow clips={item.phones} label={item.title} />
              ) : item.slides ? (
                <Gallery
                  slides={item.slides}
                  aspect={item.aspect ?? "aspect-video"}
                  ratio={item.ratio ?? 16 / 9}
                  label={item.title}
                  compare={item.gallery}
                />
              ) : item.compare ? (
                // Before and after side by side, labelled, so the comparison is
                // the thing you see rather than something you have to be told.
                <div className="flex gap-1">
                  {(
                    [
                      ["Before", item.compare.before],
                      ["After", item.compare.after],
                    ] as const
                  ).map(([label, src]) => (
                    <figure key={label} className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <span
                        className={`block overflow-hidden rounded-xl border border-[var(--foreground)]/5 ${item.aspect ?? "aspect-video"}`}
                      >
                        <img
                          src={src}
                          alt={`${item.title}, ${label.toLowerCase()}`}
                          loading="lazy"
                          className="h-full w-full object-cover object-top"
                        />
                      </span>
                      <figcaption className="text-xs text-secondary">{label}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div
                  onMouseEnter={() => play(item.id)}
                  onMouseLeave={() => pause(item.id)}
                  className={`group relative block w-full overflow-hidden rounded-xl border border-[var(--foreground)]/5 ${item.aspect ?? "aspect-video"}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {item.video && (
                    <video
                      ref={(el) => {
                        videoRefs.current[item.id] = el;
                      }}
                      src={item.video}
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-0.5">
                  {/* The title holds the left, the way in holds the right. */}
                  <div className="flex w-full items-baseline justify-between gap-4">
                    <h3 className="text-base font-medium text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    {item.visit ? (
                      <a
                        href={item.visit.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group shrink-0 text-sm text-secondary transition-colors hover:text-[var(--foreground)] hover:underline"
                      >
                        {item.visit.label}
                        <ArrowUpRight />
                      </a>
                    ) : (
                      item.thesis && (
                        <button
                          type="button"
                          onClick={() => setNotice(item.thesis!)}
                          className="group shrink-0 text-sm text-secondary transition-colors hover:text-[var(--foreground)] hover:underline"
                        >
                          Read thesis
                          <ArrowUpRight />
                        </button>
                      )
                    )}
                  </div>
                  {item.meta && <p className="text-sm text-secondary">{item.meta}</p>}
                </div>

                <p className="text-[15px] leading-relaxed text-[var(--foreground)]/70">
                  {item.desc}
                </p>
              </div>

              {item.points && (
                // The numbers carry the claim; the label underneath says what
                // was counted, so nothing here is an unsupported adjective.
                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {item.points.map((point) => (
                    <div
                      key={point.label}
                      className="flex flex-col gap-0.5 border-t border-[var(--foreground)]/10 pt-2"
                    >
                      <dt className="text-base font-medium tabular-nums text-[var(--foreground)]">
                        {point.value}
                      </dt>
                      <dd className="text-[13px] leading-snug text-[var(--foreground)]/60">
                        {point.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {item.links && (
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-sm text-secondary transition-colors hover:text-[var(--foreground)] hover:underline"
                    >
                      {link.label}
                      <ArrowUpRight />
                    </a>
                  ))}
                </div>
              )}

              {item.note && (
                <p className="text-[13px] leading-snug text-secondary">{item.note}</p>
              )}
            </article>
          ))}
        </div>
      </div>

      {notice && <Notice message={notice} onClose={() => setNotice(null)} />}
    </section>
  );
}
