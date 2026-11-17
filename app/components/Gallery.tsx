"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";

export type Slide =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

/**
 * A region of the compared screenshots, as fractions of the source image.
 * A trading screen holds far too much to judge whole: the interesting
 * comparisons are the order panel against the order panel, the chart and book
 * against the chart and book.
 */
export type CompareSection = {
  id: string;
  label: string;
  /** The crop on the redesign, in fractions of the source image. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Where the same panel sits on today's screen, when it sits elsewhere.
   *  Only the origin may differ: both sides share one width and height, or the
   *  two crops would not be the same size and nothing could be read off them. */
  from?: { x: number; y: number };
};

export type Compare = {
  /** The screen as it is today. */
  before: string;
  /** The redesign. */
  after: string;
  /** Width over height of the two source screenshots, which must match. */
  ratio: number;
  sections: CompareSection[];
};

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** A shafted arrow rather than a bare chevron: it reads as a direction at
 *  14px, where a lone chevron reads as a decoration. Sized by class, so the
 *  inset row can shrink on a phone without a second copy of the path. */
function Arrow({ dir, className }: { dir: "left" | "right"; className: string }) {
  return (
    <svg {...iconProps} className={className}>
      {dir === "left" ? (
        <>
          <path d="M19 12H5" />
          <path d="M11 18l-6-6 6-6" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </>
      )}
    </svg>
  );
}

function Replay() {
  return (
    <svg {...iconProps} strokeWidth={1.8} width="18" height="18">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function Expand() {
  return (
    <svg {...iconProps} strokeWidth={1.8} width="15" height="15">
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}

/** Two panes split down the middle: the old screen against the new one. */
function CompareIcon() {
  return (
    <svg {...iconProps} strokeWidth={1.8} width="15" height="15">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M12 4v16" />
    </svg>
  );
}

function Close() {
  return (
    <svg {...iconProps} strokeWidth={1.8} width="18" height="18">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function Grip() {
  return (
    <svg {...iconProps} strokeWidth={2} width="16" height="16">
      <path d="M9.5 7.5 5.5 12l4 4.5" />
      <path d="M14.5 7.5l4 4.5-4 4.5" />
    </svg>
  );
}

const overlayButton =
  "flex items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/75 transition-colors hover:bg-white/20 hover:text-white";

const cardButton =
  "flex items-center justify-center rounded-full border border-black/5 bg-white/85 text-black/70 shadow-sm backdrop-blur-sm transition-colors hover:bg-white";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The box an overlay grows into: as wide as it can be without spilling. */
const frameSize = (ratio: number, vw: number, vh: number) => ({
  width: `min(${vw}vw, calc(${vh}vh * ${ratio}))`,
  aspectRatio: String(ratio),
});

/** Positions a source image inside an overflow-hidden box so that only the
 *  given region of it shows, scaled to fill. */
const cropStyle = (r: { x: number; y: number; w: number; h: number }) => ({
  width: `${100 / r.w}%`,
  height: `${100 / r.h}%`,
  left: `${(-r.x / r.w) * 100}%`,
  top: `${(-r.y / r.h) * 100}%`,
});

/**
 * A stepped gallery: one slide at a time, moved with the arrows under the
 * frame, never on a timer. A video slide plays once when you arrive on it and
 * then stops with a replay control, rather than looping in the corner.
 *
 * Two controls sit in the frame's top corner. One opens the current slide
 * large; the other opens the redesign over today's screen with a divider you
 * drag: left to uncover what is live now, right to put the redesign back.
 * Both grow out of the frame rather than appearing at full size.
 */
export default function Gallery({
  slides,
  aspect,
  ratio,
  label,
  compare,
}: {
  slides: Slide[];
  aspect: string;
  /** Width over height of the slides, for sizing the zoomed frame. */
  ratio: number;
  label: string;
  compare?: Compare;
}) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [ended, setEnded] = useState(false);
  const [overlay, setOverlay] = useState<null | "zoom" | "compare">(null);
  const [mounted, setMounted] = useState(false);
  const [section, setSection] = useState(0);
  const [split, setSplit] = useState(50);
  const [glide, setGlide] = useState(true);

  const videos = useRef<Record<number, HTMLVideoElement | null>>({});
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayFrameRef = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const sourceRect = useRef<DOMRect | null>(null);
  const dragging = useRef(false);
  // The swipe. `axis` stays null until the gesture has clearly committed to a
  // direction: a finger that is really scrolling the page must not be read as
  // a sideways drag, and the first few pixels of any gesture are ambiguous.
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);
  const axis = useRef<null | "x" | "y">(null);
  // close() is identity-stable so the Escape handler never re-binds; it reads
  // which overlay is up from here rather than from a captured prop.
  const kindRef = useRef<null | "zoom" | "compare">(null);

  useEffect(() => setMounted(true), []);

  // Only the slide you are on plays. Leaving one rewinds it, so coming back
  // starts the clip again instead of resuming a frame before the end. While
  // an overlay is open, nothing plays underneath it.
  useEffect(() => {
    setEnded(false);
    Object.entries(videos.current).forEach(([key, video]) => {
      if (!video) return;
      if (Number(key) === index && !overlay) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        if (Number(key) !== index) video.currentTime = 0;
      }
    });
  }, [index, overlay]);

  const go = useCallback(
    (step: number) =>
      setIndex((i) => Math.min(slides.length - 1, Math.max(0, i + step))),
    [slides.length],
  );

  // --- opening and closing -------------------------------------------------
  //
  // Both overlays are the same move: the frame you clicked grows into the
  // middle of the screen while the backdrop darkens behind it. It is measured
  // rather than guessed, so the box genuinely starts where the card is.

  const geometry = () => {
    const frame = overlayFrameRef.current;
    const first = sourceRect.current;
    if (!frame || !first) return null;
    frame.getAnimations().forEach((a) => a.cancel());
    overlayContentRef.current?.getAnimations().forEach((a) => a.cancel());
    const last = frame.getBoundingClientRect();
    if (!last.width || !last.height) return null;
    return {
      frame,
      transform: `translate(${
        first.left + first.width / 2 - (last.left + last.width / 2)
      }px, ${
        first.top + first.height / 2 - (last.top + last.height / 2)
      }px) scale(${first.width / last.width}, ${first.height / last.height})`,
      inverse: `scale(${last.width / first.width}, ${last.height / first.height})`,
    };
  };

  const open = (kind: "zoom" | "compare") => {
    sourceRect.current = frameRef.current?.getBoundingClientRect() ?? null;
    kindRef.current = kind;
    if (kind === "compare") {
      // The redesign covers the whole frame, then slides back to the middle so
      // today's screen comes out from under it. The reveal is the explanation.
      setSplit(100);
      setGlide(true);
    }
    setOverlay(kind);
  };

  const close = useCallback(() => {
    const geo = geometry();
    const backdrop = backdropRef.current;
    if (!geo || !backdrop || reduceMotion()) return setOverlay(null);
    const timing = {
      duration: 300,
      easing: "cubic-bezier(.45,0,.3,1)",
      fill: "forwards" as const,
    };
    // Only the compare panes hold their own size on the way out, because only
    // they held it on the way in. Counter-scaling the zoomed slide would stop
    // it shrinking back into the card at all.
    if (kindRef.current === "compare")
      overlayContentRef.current?.animate(
        [{ transform: "none" }, { transform: geo.inverse }],
        timing,
      );
    backdrop.animate([{ opacity: 1 }, { opacity: 0 }], timing);
    geo.frame
      .animate([{ transform: "none" }, { transform: geo.transform }], timing)
      .finished.then(() => setOverlay(null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!overlay) return;
    // A close pins its fade at opacity 0 with fill: forwards so the backdrop
    // does not flash back to full black for the frame before it unmounts.
    // Whatever that left behind is cleared here, or an overlay opened again
    // comes up over nothing.
    backdropRef.current?.getAnimations().forEach((a) => a.cancel());
    // The card itself goes while the overlay is up. Its rect has already been
    // measured, so the big frame starts exactly where it was: left in place it
    // would sit behind the backdrop as a second, smaller copy of the same
    // picture, and the move would read as a duplicate appearing on top rather
    // than as this one growing. visibility keeps its space in the layout, so
    // nothing below it shifts.
    const card = frameRef.current;
    if (card) card.style.visibility = "hidden";
    const geo = geometry();
    const backdrop = backdropRef.current;

    if (geo && backdrop && !reduceMotion()) {
      const timing = { duration: 460, easing: "cubic-bezier(.2,.85,.25,1)" };
      geo.frame.animate(
        [{ transform: geo.transform }, { transform: "none" }],
        timing,
      );
      // The compare panes hold their own size while the box opens around them,
      // so a wide card morphing into a tall panel never stretches the picture.
      if (overlay === "compare")
        overlayContentRef.current?.animate(
          [{ transform: geo.inverse }, { transform: "none" }],
          timing,
        );
      backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 320,
        easing: "ease-out",
      });
    }

    const slide =
      overlay === "compare"
        ? window.setTimeout(() => setSplit(50), reduceMotion() ? 0 : 260)
        : 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (overlay !== "zoom") return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(slide);
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      // The card comes back in the same commit that takes the overlay away,
      // so the shrinking frame has already landed on it: one picture
      // throughout, never none and never two.
      if (card) card.style.visibility = "";
    };
  }, [overlay, close, go]);

  // --- the compare divider -------------------------------------------------

  const moveSplit = (clientX: number) => {
    const box = stripRef.current?.getBoundingClientRect();
    if (!box?.width) return;
    setSplit(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  };

  const onStripDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setGlide(false);
    e.currentTarget.setPointerCapture(e.pointerId);
    moveSplit(e.clientX);
  };

  const onStripMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveSplit(e.clientX);
  };

  const onStripUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // --- swiping the card ----------------------------------------------------

  const onFrameDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    swipe.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    axis.current = null;
  };

  const onFrameMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    if (!start || e.pointerId !== start.id) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;

    if (!axis.current) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      // Capture only once it is a drag. Capturing on the way down would
      // swallow the click on the controls sitting in the corner. It throws if
      // the pointer is already gone, and a lost capture is no reason to lose
      // the gesture with it.
      if (axis.current === "x")
        try {
          e.currentTarget.setPointerCapture(start.id);
        } catch {}
    }
    if (axis.current !== "x") return;

    // Past the first and last slide the card still moves, but grudgingly, so
    // the end of the set is felt rather than just refused.
    const held = (atStart && dx > 0) || (atEnd && dx < 0);
    setDrag(held ? dx * 0.3 : dx);
  };

  const onFrameUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    const wasDrag = start && axis.current === "x";
    axis.current = null;
    if (!wasDrag) return;
    const dx = e.clientX - start.x;
    const width = e.currentTarget.getBoundingClientRect().width || 1;
    // A short flick counts as much as a long haul: whichever is reached first.
    if (Math.abs(dx) > Math.min(72, width * 0.14)) go(dx < 0 ? 1 : -1);
    setDrag(0);
  };

  const replay = () => {
    const video = videos.current[index];
    if (!video) return;
    setEnded(false);
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const current = slides[index];
  const atStart = index === 0;
  const atEnd = index === slides.length - 1;
  const crop = compare?.sections[section];
  const cropRatio = crop ? (compare!.ratio * crop.w) / crop.h : 1;

  /** Arrows and dots together, so a still picture announces that there is more
   *  behind it.
   *
   *  "inset" rides on the picture itself, in the same translucent white as the
   *  controls in the opposite corner: a row underneath cost the card 44px of
   *  page for two arrows and four dots. "overlay" sits under the enlarged
   *  frame on the dark backdrop, where there is room to spare and covering the
   *  picture would undo the point of enlarging it. */
  const steppers = (tone: "inset" | "overlay") => {
    const inset = tone === "inset";

    const arrow = (dir: "left" | "right", step: number, disabled: boolean) => (
      <button
        type="button"
        onClick={() => go(step)}
        disabled={disabled}
        aria-label={dir === "left" ? "Previous" : "Next"}
        className={`relative flex shrink-0 items-center justify-center rounded-full transition-colors disabled:cursor-default ${
          inset
            ? "size-5 text-black/55 hover:bg-black/[.07] hover:text-black sm:size-6"
            : "size-8 border border-white/15 text-white/60 hover:border-white/35 hover:text-white"
        } ${disabled ? "opacity-25" : ""}`}
      >
        <Arrow
          dir={dir}
          className={inset ? "size-3 sm:size-[15px]" : "size-[15px]"}
        />
        {/* The button is 20px on a phone because that is the size asked for,
            which is under what a thumb wants. This costs no layout and no ink:
            it only widens what counts as a press. */}
        {inset && <span aria-hidden className="absolute -inset-1.5 sm:hidden" />}
      </button>
    );

    const row = (
      <>
        {arrow("left", -1, atStart)}
        <div className={inset ? "flex items-center gap-1 sm:gap-1.5" : "flex items-center gap-1.5"}>
          {slides.map((slide, j) => (
            <span
              key={slide.src}
              className={`rounded-full transition-all duration-300 ${
                inset
                  ? `h-1 sm:h-1.5 ${j === index ? "w-3 sm:w-4" : "w-1 sm:w-1.5"}`
                  : `h-1.5 ${j === index ? "w-4" : "w-1.5"}`
              } ${
                inset
                  ? j === index
                    ? "bg-black/65"
                    : "bg-black/20"
                  : j === index
                    ? "bg-white/80"
                    : "bg-white/25"
              }`}
            />
          ))}
        </div>
        {arrow("right", 1, atEnd)}
      </>
    );

    if (!inset)
      return (
        <div className="flex items-center justify-center gap-4">{row}</div>
      );

    return (
      // Smaller on a phone, where the frame itself is only a few hundred
      // pixels wide and the pill was eating a visible share of the picture.
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center sm:bottom-3">
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-black/5 bg-white/85 px-1 py-1 shadow-sm backdrop-blur-sm sm:gap-2.5 sm:px-1.5 sm:py-1.5">
          {row}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        ref={frameRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        onPointerDown={onFrameDown}
        onPointerMove={onFrameMove}
        onPointerUp={onFrameUp}
        onPointerCancel={onFrameUp}
        // pan-y, so a vertical swipe still scrolls the page while a horizontal
        // one belongs to the carousel instead of the browser.
        style={{ touchAction: "pan-y" }}
        className={`group relative touch-pan-y overflow-hidden rounded-xl border border-[var(--foreground)]/5 ${aspect}`}
      >
        <div
          className={`flex h-full w-full ${
            drag ? "" : "transition-transform duration-500 ease-out"
          }`}
          style={{
            transform: `translateX(calc(${-index * 100}% + ${drag}px))`,
          }}
        >
          {slides.map((slide, i) => (
            <div key={slide.src} className="relative h-full w-full shrink-0">
              {slide.type === "image" ? (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  src={slide.src}
                  poster={slide.poster}
                  aria-label={slide.alt}
                  muted
                  playsInline
                  preload="metadata"
                  onEnded={() => setEnded(true)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {current?.type === "video" && ended && (
          <button
            type="button"
            onClick={replay}
            aria-label="Replay"
            className="absolute inset-0 flex items-center justify-center bg-black/25 text-white"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm">
              <Replay />
            </span>
          </button>
        )}

        <div className="absolute right-3 top-3 flex gap-1.5">
          {compare && (
            <button
              type="button"
              onClick={() => open("compare")}
              aria-label="Compare with today's screen"
              title="Compare with today's screen"
              className={`size-8 ${cardButton}`}
            >
              <CompareIcon />
            </button>
          )}
          <button
            type="button"
            onClick={() => open("zoom")}
            aria-label="View larger"
            title="View larger"
            className={`size-8 ${cardButton}`}
          >
            <Expand />
          </button>
        </div>

        {slides.length > 1 && steppers("inset")}
      </div>

      {mounted &&
        overlay &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={
              overlay === "compare" ? `${label}, today and redesigned` : label
            }
            className="fixed inset-0 z-[200] flex items-center justify-center"
          >
            <div
              ref={backdropRef}
              onClick={close}
              className="absolute inset-0 bg-black/85"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className={`absolute right-4 top-4 z-10 size-9 ${overlayButton}`}
            >
              <Close />
            </button>

            <div className="relative flex max-h-full flex-col items-center gap-4">
              <div
                ref={overlayFrameRef}
                style={
                  overlay === "compare"
                    ? frameSize(cropRatio, 94, 86)
                    : frameSize(ratio, 88, 80)
                }
                className="relative overflow-hidden rounded-xl bg-black shadow-2xl"
              >
                <div ref={overlayContentRef} className="h-full w-full">
                  {overlay === "compare" && compare && crop ? (
                    <div
                      ref={stripRef}
                      onPointerDown={onStripDown}
                      onPointerMove={onStripMove}
                      onPointerUp={onStripUp}
                      onPointerCancel={onStripUp}
                      className="relative h-full w-full cursor-ew-resize touch-none select-none"
                    >
                      {/* Today underneath, the redesign clipped over it. */}
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={compare.before}
                          alt={`${label}, the screen today`}
                          draggable={false}
                          style={cropStyle({ ...crop, ...crop.from })}
                          className="absolute max-w-none object-cover"
                        />
                      </div>
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          clipPath: `inset(0 ${100 - split}% 0 0)`,
                          transition: glide
                            ? "clip-path .55s cubic-bezier(.22,1,.36,1)"
                            : "none",
                        }}
                      >
                        <img
                          src={compare.after}
                          alt={`${label}, redesigned`}
                          draggable={false}
                          style={cropStyle(crop)}
                          className="absolute max-w-none object-cover"
                        />
                      </div>

                      <span
                        className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/85 backdrop-blur-sm transition-opacity"
                        style={{ opacity: split > 18 ? 1 : 0 }}
                      >
                        Redesigned
                      </span>
                      <span
                        className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/85 backdrop-blur-sm transition-opacity"
                        style={{ opacity: split < 82 ? 1 : 0 }}
                      >
                        Today
                      </span>

                      <div
                        className="pointer-events-none absolute inset-y-0 w-px bg-white/80"
                        style={{
                          left: `${split}%`,
                          transition: glide
                            ? "left .55s cubic-bezier(.22,1,.36,1)"
                            : "none",
                        }}
                      >
                        <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black/70 shadow-lg">
                          <Grip />
                        </span>
                      </div>
                    </div>
                  ) : current?.type === "video" ? (
                    <video
                      src={current.src}
                      poster={current.poster}
                      aria-label={current.alt}
                      controls
                      autoPlay
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={current?.src}
                      alt={current?.alt}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              {overlay === "compare" && compare ? (
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {compare.sections.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSection(i);
                        setGlide(true);
                        setSplit(50);
                      }}
                      className={`rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                        i === section
                          ? "border-white/25 bg-white/15 text-white"
                          : "border-white/10 text-white/55 hover:border-white/25 hover:text-white/90"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              ) : (
                steppers("overlay")
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
