"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";

/**
 * Two stacked notification cards pinned to the top of the home page, after the
 * one on marvinschwaibold.com.
 *
 * - The second card peeks out beneath the first. Hovering (or, on touch, a
 *   first tap) slides it fully into view below.
 * - The stack only shows while the page is scrolled to the very top. Any scroll
 *   lifts it out of view, and scrolling back to the top brings it back.
 * - It hides while a writing sheet is open, so it never sits over an article.
 *
 * Rendered into document.body. It is position: fixed, and inside Silk's scroll
 * container a transformed ancestor would pin it to that container instead.
 */

type Toast = { href: string; title: string; subtitle: string; image: string };

// Front card first. Edit freely: any two links work, internal or external.
const TOASTS: [Toast, Toast] = [
  {
    href: "https://x.com/SuperteamIN/status/2115769095971049927",
    title: "Redesign Your Favourite App on Solana",
    subtitle: "Won first place, Superteam India",
    image: "/notificationbar/superteam.webp",
  },
  {
    href: "https://x.com/dezloperr/status/2100593773621494037",
    title: "MagicBlock Solana Blitz v8",
    subtitle: "Won first place at the hackathon",
    image: "/notificationbar/magicblock.webp",
  },
];

const CSS = `
.toast-stack {
  --toast-height: 76px;
  --toast-peek: 12px;
  --toast-expanded: 88px;
  --toast-hidden: 104px;
  position: fixed;
  z-index: 120;
  top: max(20px, calc(env(safe-area-inset-top) + 18px));
  left: 50%;
  box-sizing: content-box;
  width: min(392px, 100vw - 32px);
  height: var(--toast-height);
  transform: translateX(-50%);
  transition: transform .18s, visibility .18s step-end;
}
.toast-stack[data-visible="false"],
body.sheet-open .toast-stack {
  visibility: hidden;
  pointer-events: none;
  transform: translateX(-50%) translateY(calc(-1 * var(--toast-hidden)));
}
.toast-stack[data-visible="true"] {
  visibility: visible;
  transition: transform .18s, visibility step-start;
}
@media (max-width: 520px) {
  .toast-stack {
    left: 16px;
    width: min(358px, 100vw - 32px);
    transform: none;
  }
  .toast-stack[data-visible="false"],
  body.sheet-open .toast-stack {
    transform: translateY(calc(-1 * var(--toast-hidden)));
  }
}

/* Both cards ride on this one element. The entrance moves it, never them,
   so their resting stack transforms are left alone. */
.toast-entrance {
  position: relative;
  width: 100%;
  height: var(--toast-height);
}

.toast {
  position: absolute;
  inset: 0 0 auto;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: var(--toast-height);
  padding: 10px 16px 10px 12px;
  border: 1px solid rgba(51, 51, 51, .08);
  border-radius: 18px;
  /* Opaque underneath, so no backdrop-filter: it would blur nothing visible
     while forcing a backdrop re-read on every frame of the arrival. */
  background: linear-gradient(rgba(255,255,255,.96), rgba(255,255,255,.88)), #fff;
  box-shadow: 0 22px 55px rgba(35,61,56,.16), 0 8px 22px rgba(35,61,56,.12), inset 0 1px rgba(255,255,255,.9);
  color: #333;
  text-decoration: none;
  transition: box-shadow .18s, transform .18s;
}
.toast:focus { outline: 0; }
.toast:focus-visible {
  box-shadow: 0 26px 64px rgba(35,61,56,.18), 0 10px 26px rgba(35,61,56,.14), inset 0 1px rgba(255,255,255,.9);
}
.toast-front { z-index: 2; }
.toast-back {
  z-index: 1;
  transform: translateY(var(--toast-peek)) scale(.965);
}
.toast-stack[data-expanded="true"] .toast-back {
  transform: translateY(var(--toast-expanded)) scale(1);
}
/* Stacked, the front card's deep shadow falls on empty page. Once the second
   card slides out from under it, that same shadow lands squarely on it, so
   pull it in to a close one while the stack is open. */
.toast-stack[data-expanded="true"] .toast-front {
  box-shadow: 0 6px 16px rgba(35,61,56,.10), 0 2px 6px rgba(35,61,56,.08), inset 0 1px rgba(255,255,255,.9);
}

/* :hover and :focus-within open the stack only where a pointer can actually
   leave again. A phone keeps the hover state on whatever was tapped last and
   focus on whatever was tapped last, so on touch these rules held the stack
   open after data-expanded had already gone back to false: it stayed down
   until something else was tapped, which is exactly what it looked like.
   Touch opens it through data-expanded alone, which a scroll can clear.
   The padding is hover's too: it is the bridge the cursor crosses to reach
   the card below, and on touch it is an invisible 88px band over the page. */
@media (hover: hover) and (pointer: fine) {
  .toast-stack { padding-bottom: var(--toast-expanded); }
  .toast-stack:hover .toast-back,
  .toast-stack:focus-within .toast-back {
    transform: translateY(var(--toast-expanded)) scale(1);
  }
  .toast-stack:hover .toast-front,
  .toast-stack:focus-within .toast-front {
    box-shadow: 0 6px 16px rgba(35,61,56,.10), 0 2px 6px rgba(35,61,56,.08), inset 0 1px rgba(255,255,255,.9);
  }
}
@media not all and (hover: hover) {
  .toast-stack[data-expanded="true"] { padding-bottom: var(--toast-expanded); }
}

.toast-thumb {
  position: relative;
  isolation: isolate;
  display: block;
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 14px;
  background: #f4f4f2;
  box-shadow: 0 0 0 1px rgba(22,22,22,.08), 0 7px 16px rgba(35,61,56,.13);
}
.toast-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.toast-copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}
.toast-copy strong {
  overflow: hidden;
  font-size: 13.5px;
  font-weight: 400;
  line-height: 1.05;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--foreground);
}
.toast-copy span {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.12;
  color: color-mix(in srgb, var(--foreground) 45%, transparent);
}
`;

const isTouch = () =>
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

// When the page's own cascade has settled the top of the page. The stack holds
// back until the text has clearly finished, so it reads as its own beat rather
// than the tail of the page arriving.
const PAGE_INTRO_MS = 980;

// The arrival, measured off marvinschwaibold.com frame by frame: the stack
// drops from 112px above, overshoots its resting place by 23px at ~280ms, comes
// back through, and rings down over about a second. That is a spring, not an
// easing curve, which is why it cannot be written as keyframes: a cubic-bezier
// can overshoot once but it cannot oscillate. Fitting the sampled curve gives a
// damping ratio of 0.450 at 13.3 rad/s, which for unit mass is:
const SPRING_START = -112;
const SPRING_STIFFNESS = 178;
const SPRING_DAMPING = 12;
// Fixed integration step, and the point past which the arrival is simply over.
const SPRING_STEP = 1 / 240;
const SPRING_MAX_MS = 2500;
// Opacity is deliberately untouched. His never fades; it is purely vertical.

export default function ToastStack() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const arriving = useRef(false);

  useEffect(() => setMounted(true), []);

  // The arrival, integrated per frame rather than declared as keyframes.
  //
  // useLayoutEffect, not useEffect: the starting offset has to be written
  // before the browser paints, or the stack shows for one frame at its resting
  // place and then jumps back up to fall again.
  //
  // The wait is measured from when the page started loading, not from this
  // mount: the stack is client-only, so it arrives after hydration, and how
  // long that takes varies. Whatever is left of the cascade is what it waits.
  useLayoutEffect(() => {
    const el = entranceRef.current;
    if (!el) return;
    if (document.documentElement.classList.contains("home-visited")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = SPRING_START;
    let velocity = 0;
    let last = 0;
    let started = 0;
    let frame = 0;

    // Parked off screen AND hidden. The card sits 112px above its resting
    // place for the whole wait, and its shadow reaches about 77px below it, so
    // left merely translated it spills a grey smudge across the top of the
    // page for a second before the card itself ever appears. visibility is
    // instant and uncomposited, so revealing it costs nothing and, unlike
    // opacity, cannot read as a fade.
    el.style.transform = `translateY(${SPRING_START}px)`;
    el.style.visibility = "hidden";
    // Promoted up front, not at the first frame: asking for the layer mid
    // animation costs a re-raster of two large shadows exactly when the
    // stack starts moving.
    el.style.willChange = "transform";
    arriving.current = true;

    const settle = () => {
      cancelAnimationFrame(frame);
      el.style.transform = "";
      el.style.willChange = "";
      arriving.current = false;
    };

    const step = (now: number) => {
      const elapsed = now - started;
      // A tab that was throttled or backgrounded comes back to a finished
      // animation, not to one playing out in slow motion.
      if (elapsed > SPRING_MAX_MS) return settle();

      // Integrated in fixed sub-steps rather than one step of however long the
      // frame happened to be. Stepping by the frame time makes the spring run
      // slower on a slow device, because each frame advances the simulation by
      // at most one clamped dt: the physics has to follow the clock, not the
      // frame rate.
      let remaining = Math.min((now - last) / 1000, SPRING_MAX_MS / 1000);
      last = now;
      while (remaining > 0) {
        const h = Math.min(remaining, SPRING_STEP);
        velocity += (-SPRING_STIFFNESS * x - SPRING_DAMPING * velocity) * h;
        x += velocity * h;
        remaining -= h;
      }

      if (Math.abs(x) < 0.08 && Math.abs(velocity) < 0.08) return settle();
      el.style.transform = `translateY(${x.toFixed(2)}px)`;
      frame = requestAnimationFrame(step);
    };

    // The hard stop above is checked on a frame, so it only ever fires if
    // frames are arriving. A page loaded in a background tab gets none at all,
    // and the stack would hang 112px above the fold until the tab was looked
    // at. A plain timer owes nothing to the compositor.
    let backstop = 0;

    const timer = window.setTimeout(
      () => {
        el.style.visibility = "";
        last = performance.now();
        started = last;
        frame = requestAnimationFrame(step);
        backstop = window.setTimeout(settle, SPRING_MAX_MS);
      },
      Math.max(0, PAGE_INTRO_MS - performance.now()),
    );

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(backstop);
      cancelAnimationFrame(frame);
      el.style.visibility = "";
      el.style.willChange = "";
      arriving.current = false;
    };
  }, [mounted]);

  // Silk replaces page scrolling with its own container, but only where it
  // needs to: on touch it leaves native page scrolling alone, so the container
  // is present and stays at 0 while the window is what actually moves. Watch
  // both, or the stack never notices a scroll on a phone and rides along.
  useEffect(() => {
    const silk = document.querySelector<HTMLElement>('[data-silk~="c2"]');
    const scrolled = () =>
      Math.max(
        silk?.scrollTop ?? 0,
        window.scrollY,
        document.documentElement.scrollTop,
      );
    const onScroll = () => {
      // A scroll event while the stack is still falling would translate the
      // whole thing 104px away mid-flight and snap it back: a visible jump on
      // top of the spring. Silk fires one as it hydrates.
      if (arriving.current) return;
      setVisible(scrolled() <= 0);
      setExpanded(false);
    };
    // A scroll event does not bubble, so listening on window alone misses one
    // that happens inside any other element. Capturing on the document catches
    // every scroll in the page whatever is doing the scrolling, which is the
    // only way to be sure on a phone, where which element actually moves
    // depends on how Silk resolved nativePageScrollReplacement.
    const collapse = () => setExpanded(false);
    onScroll();
    const opts = { passive: true } as const;
    document.addEventListener("scroll", onScroll, { capture: true, ...opts });
    window.addEventListener("scroll", onScroll, opts);
    // The gesture itself, not its result: a swipe that scrolls nothing (the
    // page is already at the top, or the finger started on the stack) still
    // means the reader has moved on from it.
    window.addEventListener("touchmove", collapse, opts);
    window.addEventListener("wheel", collapse, opts);
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", collapse);
      window.removeEventListener("wheel", collapse);
    };
  }, []);

  // On touch, a tap anywhere else collapses the expanded stack.
  useEffect(() => {
    if (!expanded) return;
    const onDown = (e: PointerEvent) => {
      if (e.target instanceof Node && stackRef.current?.contains(e.target))
        return;
      setExpanded(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [expanded]);

  // Touch has no hover, so the first tap expands instead of following a link.
  const onClickCapture = (e: MouseEvent) => {
    if (!isTouch() || expanded) return;
    e.preventDefault();
    e.stopPropagation();
    setExpanded(true);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        ref={stackRef}
        className="toast-stack"
        data-visible={visible ? "true" : "false"}
        data-expanded={expanded ? "true" : "false"}
        onClickCapture={onClickCapture}
      >
        <div ref={entranceRef} className="toast-entrance">
          {TOASTS.map((toast, i) => {
            const className = `toast ${i === 0 ? "toast-front" : "toast-back"}`;
            const label = `${toast.title}: ${toast.subtitle}`;
            const body = (
              <>
                <span className="toast-thumb" aria-hidden>
                  <img
                    src={toast.image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="toast-copy">
                  <strong>{toast.title}</strong>
                  <span>{toast.subtitle}</span>
                </span>
              </>
            );

            return toast.href.startsWith("http") ? (
              <a
                key={toast.href}
                href={toast.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                aria-label={label}
              >
                {body}
              </a>
            ) : (
              <Link
                key={toast.href}
                href={toast.href}
                className={className}
                aria-label={label}
              >
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </>,
    document.body,
  );
}
