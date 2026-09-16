"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
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
    href: "https://colosseum.com/worldsfair",
    title: "Colosseum Crypto World's Fair",
    subtitle: "Currently building for the hackathon",
    image: "/notificationbar/colosseum.webp",
  },
  {
    href: "https://solanamobile.radiant.nexus/",
    title: "Clock In: Solana Mobile Hackathon",
    subtitle: "Currently building for the Solana Seeker",
    image: "/notificationbar/clockin-thumb.webp",
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
  /* Keeps hover alive while the cursor moves down to the expanded card. */
  padding-bottom: var(--toast-expanded);
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
  background: linear-gradient(rgba(255,255,255,.96), rgba(255,255,255,.88)), rgba(255,255,255,.94);
  -webkit-backdrop-filter: blur(18px) saturate(1.08);
  backdrop-filter: blur(18px) saturate(1.08);
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
.toast-stack:hover .toast-back,
.toast-stack:focus-within .toast-back,
.toast-stack[data-expanded="true"] .toast-back {
  transform: translateY(var(--toast-expanded)) scale(1);
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

const isTouch = () => window.matchMedia("(hover: none), (pointer: coarse)").matches;

export default function ToastStack() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Silk replaces native page scrolling with its own container, so the window
  // never scrolls here. Watch that container, falling back to the window.
  useEffect(() => {
    const silk = document.querySelector<HTMLElement>('[data-silk~="c2"]');
    const atTop = () => (silk ? silk.scrollTop : window.scrollY) <= 0;
    const onScroll = () => {
      setVisible(atTop());
      setExpanded(false);
    };
    onScroll();
    const target: HTMLElement | Window = silk ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  // On touch, a tap anywhere else collapses the expanded stack.
  useEffect(() => {
    if (!expanded) return;
    const onDown = (e: PointerEvent) => {
      if (e.target instanceof Node && stackRef.current?.contains(e.target)) return;
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
        {TOASTS.map((toast, i) => {
          const className = `toast ${i === 0 ? "toast-front" : "toast-back"}`;
          const label = `${toast.title}: ${toast.subtitle}`;
          const body = (
            <>
              <span className="toast-thumb" aria-hidden>
                <img src={toast.image} alt="" loading="eager" decoding="async" />
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
            <Link key={toast.href} href={toast.href} className={className} aria-label={label}>
              {body}
            </Link>
          );
        })}
      </div>
    </>,
    document.body
  );
}
